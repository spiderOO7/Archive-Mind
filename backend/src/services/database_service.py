import os
from io import BytesIO

import aiohttp
import motor.motor_asyncio
from bson import ObjectId
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer

from ..models.project_model import ProjectCreate
from ..models.seed_projects import seed_projects

load_dotenv(override=True)

# Toggle fake DB mode when Mongo is unavailable or USE_FAKE_DB=true (default for demo).
USE_FAKE_DB = os.getenv("USE_FAKE_DB", "true").lower() == "true" or not os.getenv("MONGO_DETAILS")

# Initialize the SentenceTransformer model once.
model = SentenceTransformer("all-MiniLM-L6-v2")

MONGO_DETAILS = os.getenv("MONGO_DETAILS")

client = None if USE_FAKE_DB else motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = None if USE_FAKE_DB else client.scholarSafe
users_collection = None if USE_FAKE_DB else database.get_collection("users")
project_collection = None if USE_FAKE_DB else database.get_collection("projects")

# Simple in-memory stores for demo mode
fake_users = []
fake_projects = seed_projects.copy()


async def generate_embedding(text: str) -> list:
    try:
        embedding = model.encode(text).tolist()
        return embedding
    except Exception as e:
        raise Exception(f"Error generating embedding: {e}")

# Helpers
def user_helper(user) -> dict:
    return {
        "id": str(user.get("_id", user.get("id"))),
        "email": user["email"],
        "username": user["username"],
        "password": user["password"]
    }

async def get_user_by_email(email: str) -> dict:
    if USE_FAKE_DB:
        for user in fake_users:
            if user["email"].lower() == email.lower():
                return user_helper(user)
        return None
    user = await users_collection.find_one({"email": email})
    if user:
        return user_helper(user)

async def create_user(user_data: dict) -> dict:
    if USE_FAKE_DB:
        new_user = {**user_data, "id": str(len(fake_users) + 1)}
        fake_users.append(new_user)
        return user_helper(new_user)
    user = await users_collection.insert_one(user_data)
    new_user = await users_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)

async def extract_text_from_pdf(pdf_url: str) -> str:
    async with aiohttp.ClientSession() as session:
        async with session.get(pdf_url) as response:
            if response.status == 200:
                pdf_data = await response.read()
                pdf_reader = PdfReader(BytesIO(pdf_data))
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text()
                return text
            else:
                raise Exception(f"Failed to fetch PDF. Status code: {response.status}")

async def create_project(project: ProjectCreate) -> dict:
    project_data = project.to_dict()
    # Extract text from the PDF and add it to the project data (best-effort).
    try:
        pdf_description = await extract_text_from_pdf(project.project_pdf_link)
        project_data["project_pdf_description"] = pdf_description
    except Exception:
        project_data["project_pdf_description"] = ""
    
    # Combine project description and PDF description for embedding
    combined_description = f"{project.project_description} {project_data.get('project_pdf_description', '')}"
    try:
        project_data["project_description_embedding"] = await generate_embedding(combined_description)
    except Exception as e:
        raise Exception(f"Failed to generate embedding: {e}")
    
    if USE_FAKE_DB:
        project_data["id"] = str(len(fake_projects) + 1)
        fake_projects.append(project_data)
        return project_data

    # Save the project to the database
    result = await project_collection.insert_one(project_data)
    new_project = await project_collection.find_one({"_id": result.inserted_id})
    return {
        "id": str(new_project["_id"]),
        "project_title": new_project["project_title"],
        "project_description": new_project["project_description"],
        "project_pdf_link": new_project["project_pdf_link"],
        "project_pdf_description": new_project["project_pdf_description"],
        "project_description_embedding": new_project["project_description_embedding"],
        "team_members": new_project["team_members"],
        "year_done": new_project["year_done"],
        "tech_stack": new_project["tech_stack"]
    }

async def search_projects_by_title_in_db(keyword: str = "") -> list:
    try:
        if USE_FAKE_DB:
            if not keyword:
                return [proj.copy() for proj in fake_projects]
            keyword_lower = keyword.lower()
            return [
                proj.copy()
                for proj in fake_projects
                if keyword_lower in proj.get("project_title", "").lower()
            ]

        query = {}
        if keyword:
            query = {"project_title": {"$regex": keyword, "$options": "i"}}
        projects_cursor = project_collection.find(query)
        projects = await projects_cursor.to_list(length=None)
        return [
            {
                "id": str(project["_id"]),
                "project_title": project["project_title"],
                "project_description": project["project_description"],
                "project_pdf_link": project["project_pdf_link"],
                "team_members": project["team_members"],
                "year_done": project["year_done"],
                "tech_stack": project["tech_stack"]
            }
            for project in projects
        ]
    except Exception as e:
        raise Exception(f"Error while searching projects: {e}")

async def fetch_all_projects_in_db() -> list:
    try:
        if USE_FAKE_DB:
            return [proj.copy() for proj in fake_projects]

        projects_cursor = project_collection.find({})
        projects = await projects_cursor.to_list(length=None)
        return [
            {
                "id": str(project["_id"]),
                "project_title": project["project_title"],
                "project_description": project["project_description"],
                "project_pdf_link": project["project_pdf_link"],
                "team_members": project["team_members"],
                "year_done": project["year_done"],
                "tech_stack": project["tech_stack"]
            }
            for project in projects
        ]
    except Exception as e:
        raise Exception(f"Error while fetching all projects: {e}")

async def fetch_projects_by_ids(project_ids: list) -> list:
    try:
        if USE_FAKE_DB:
            results = []
            for pid in project_ids:
                for proj in fake_projects:
                    if str(proj.get("id")) == str(pid):
                        results.append(proj.copy())
            return results

        object_ids = [ObjectId(pid) for pid in project_ids]
        projects = await project_collection.find({"_id": {"$in": object_ids}}).to_list(length=len(project_ids))
        return [
            {
                **project,
                "id": str(project["_id"]),
                "_id": str(project["_id"]),
            }
            for project in projects
        ]
    except Exception as e:
        raise Exception(f"Error fetching projects by IDs: {e}")

# Precompute embeddings for seed projects when running in fake mode so similarity search works.
if USE_FAKE_DB:
    for proj in fake_projects:
        combined_description = f"{proj.get('project_description', '')} {proj.get('project_pdf_description', '')}".strip()
        try:
            proj["project_description_embedding"] = model.encode(combined_description).tolist()
        except Exception:
            proj["project_description_embedding"] = []