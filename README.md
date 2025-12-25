# ScholarSafe (Archive-Mind)

A semantic search application for archiving and finding projects using vector embeddings and AI.

## Prerequisites

- **Node.js** (v18+ recommended)
- **Python** (v3.10+ recommended)
- **MongoDB** (Local instance or Atlas URI)

## Quick Start

### 1. Backend Setup

The backend handles the API, authentication, and search logic.

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Create a `.env` file in the `backend` directory with the following content:

    ```env
    MONGO_DETAILS=mongodb://localhost:27017  # Or your MongoDB Atlas URI
    JWT_SECRET=your_super_secret_key_here
    JWT_ALGORITHM=HS256
    ```

3.  Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The server will start at `http://127.0.0.1:8000`.

### 2. Frontend Setup

The frontend is a React application built with Vite.

1.  Open a new terminal and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    # OR if you use pnpm
    pnpm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    # OR
    pnpm run dev
    ```
    The application will run at `http://localhost:5173`.

## Features

- **Semantic Search**: Search for projects using natural language (powered by `sentence-transformers` & `faiss`).
- **Project Upload**: Upload project details and PDFs (requires Cloudinary configuration in `SearchProject.tsx` if customized).
- **Authentication**: User login and signup with JWT and Google Auth support.
