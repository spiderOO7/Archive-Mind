import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import CardComp from "./CardComp";
import { BackgroundBeamsDemo } from "./components/elements/BeamsBackground";
import axios from "axios";
import ProjectDescription from "./ProjectDescription";

type Project = {
    project_description: string;
    project_title: string;
    team_members: Array<string>;
    tech_stack: Array<string>;
    year_done: number;
    project_pdf_link: string;
};

function SearchProject(){
    const [searchValue, setSearch] = useState("");
    const [view, setView] = useState(false); 
    const handleKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if( e.key === "Enter" ){  
             console.log(searchValue);
             setSearch("");
        }
    }

    const [data, setData] = useState<Project[]>([]);
    const [id,setId] = useState<number>(0);
    const [uploadedfile,setuploadedfile] = useState<File | null>(null);
    const [url,setUrl] = useState<string>("");
    const [uploadStatus, setUploadStatus] = useState<string>("");

    const CLOUD_NAME = 'dkao49k4p';
    const UPLOAD_PRESET = 'Scholar-safe';

    useEffect(()=>{
      if(searchValue.length == 0){
        axios.get('http://127.0.0.1:8000/projects/all').then((res)=>{setData(res.data)}).catch((error)=>{console.log(error)});
      }
    },[searchValue])

    const after_do = async () =>{
      if (!uploadedfile) {
        setUploadStatus("No file selected");
        return;
      }
      setUploadStatus("Uploading...");
      console.log("after_do inititated");
      const formData = new FormData();
      formData.append('file', uploadedfile);
      formData.append('upload_preset', UPLOAD_PRESET);
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
          formData
        );
        setUrl(res.data.secure_url);
        setUploadStatus("Upload successful!");
        console.log("Uploaded URL:", res.data.secure_url);
      } catch (err) {
        setUploadStatus("Upload failed.");
        console.error(err);
      }
    }

    useEffect(()=>{
      if (uploadedfile && uploadedfile.size > 4 && uploadedfile.name.slice(-4).toLowerCase() === ".pdf") {
        after_do();
      } 
    },[uploadedfile]);

 

    const handleSubmit = () =>{
       console.log("clicked");
       if (!searchValue && !url) {
        console.error("Both searchValue and url are empty. Cannot proceed.");
        return;
      }
       const bodyParams = {
        description: searchValue, // Search description
        pdf_url: url,            // Uploaded PDF URL
        top_k: 5                // Number of top results to fetch
      };
      console.log("came here");
      console.log(bodyParams);
      
      axios.post('http://127.0.0.1:8000/projects/similarity-search',bodyParams).then((res) => {
          console.log("balabb");console.log(res.data, "value");
          setData(res.data);
      }).catch((error) => {
          console.log(error.message);
      });
    }
    return(
        <>
        <div className="h-screen w-screen  z-0">
         <BackgroundBeamsDemo>
           <div className="h-screen w-[100%]  flex flex-col ">
            <div className=" h-[20%] w-[100%] flex items-center justify-center  ">
<div className="h-[50%] w-[10%] relative mr-4">  {/* Added margin-right */}
  {uploadedfile && url ? (
    <button
      onClick={() => {
        setuploadedfile(null);
        setUrl("");
        setUploadStatus("");
      }}
      className="flex items-center justify-center h-full w-full border-2 border-red-500 bg-red-600 rounded-xl text-white cursor-pointer select-none px-2"
    >
      Remove PDF
    </button>
  ) : (
    <>
      <input
        type="file"
        id="file-upload"
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        onChange={(e) => { setuploadedfile(e.target.files ? e.target.files[0] : null); }}
      />
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center h-full w-full border-2 border-white rounded-xl text-white cursor-pointer select-none px-2"
      >
        Upload PDF
      </label>
    </>
  )}
  {uploadStatus && (
    <div className="text-xs text-white mt-1">{uploadStatus}</div>
  )}
</div>
               {/* <button className="h-[50%] w-[10%] border-2 border-green-600">Upload File</button> */}
                <div className="relative h-[50%] w-[70%] ">
<input
  value={searchValue}
  onKeyDown={handleKey}
  onChange={(e) => setSearch(e.target.value)}
  className="pl-10 pr-12 h-full w-full bg-transparent opacity-100 border-2 border-white rounded-full text-[20px] p-3 text-white"
  type="text"
  placeholder="Search"
/>
                    {/* </input> */}
                    <button onClick={handleSubmit}> <Search className="absolute right-3 top-1/2 transform -translate-x-4 -translate-y-1/2 text-white " /></button>
                </div>
            </div> 
            
            <div className="h-[80%] w-[90%] flex flex-wrap justify-center gap-6 overflow-y-auto  " style={{paddingLeft:"70px"}}>
             {data.map((item, index) => (
                <CardComp key={index} idx={index} {...item} setView={setView} setId={setId} />
             ))}
            </div>
        </div>
        </BackgroundBeamsDemo>
        </div>
        
        {view && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
           
            {/* <div className="bg-white text-black p-8 rounded-xl">
              <button onClick={() => setView(false)}>Close</button>
              <div>Project Details...</div>
            </div> */}
            <ProjectDescription id={id} data={data} setView={setView} />
          </div>
        )}
        </>
    )
}
export default SearchProject;