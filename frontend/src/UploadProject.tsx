import {  useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from "sonner";
import { Uploader } from './components/elements/Uploader';
import { BackgroundBeamsDemo } from "./components/elements/BeamsBackground";
import { FloatingDockDemo } from './components/elements/FloatingDockMemo';
import { useNavigate } from 'react-router';
import TitleComponent from './TitleComponent';
// import { get } from 'http';

export const UploadProject = () => {
  const navigate = useNavigate();
  const [num, setNum] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [yearDone, setYear] = useState(0);
  const [member, setMember] = useState<string[]>([]);

  const CLOUD_NAME = 'dkao49k4p';
  const UPLOAD_PRESET = 'Scholar-safe';

  const handleUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setError('');
    setUrl('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        formData
      );
      setUrl(res.data.secure_url);
      console.log("Uploaded URL:", res.data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      console.error(err);
      setError('Upload failed.');
      console.log(error);
      toast.error('Upload failed');
    } finally {
      // setUploading(false);
    }
  };

  const onSubmit = () => {
    if (!title || !description || !techStack || !url) {
      toast.error('Please fill all the fields');
      setNum(1);
    } else {
      toast.success('Form submitted');
      console.log({ title, description, techStack, url,member,yearDone});
      axios.post("http://127.0.0.1:8000/projects/add",{project_title:title,project_description:description,project_pdf_link:url,year_done:yearDone,team_members:member,tech_stack:techStack}).then(()=>{console.log("OK")}).catch((error)=>{console.log(error.message)})
      setNum(1);
      setTitle('');
      setDescription('');
      setTechStack([]);
      setUrl('');
      setNum(1);
    }
  };

  useEffect(() => {    
    
    if (num === 12) {
      onSubmit();
    }
    if( num == 0){
       navigate('/homepage');
    }
  }, [num]);

  const getInputValue = () => {
    switch (num) {
      case 1: return title;
      case 2: return description;
      case 4: return techStack;
      default: return '';
    }
  };

  const setInputValue = (val: string) => {
    // if (num === 1) setTitle(val);
    if (num === 2) setDescription(val);
    if (num === 1) setTitle(val);
    if (num === 4) setTechStack(val.split(',').map(item => item.trim()));
  };

  const opens = localStorage.getItem("open");
  console.log( opens);
  return (
     
    <>
    <BackgroundBeamsDemo>

      <div className='h-[750px] w-[1000px] flex flex-col items-center justify-evenly relative z-10'>
        <div className='h-[20%] w-[90%] flex items-center justify-center'>
            <FloatingDockDemo  setNum={setNum}   />
        </div>

        <div className='h-[65%] w-[80%] flex flex-col items-center justify-between '>
          {(num === 2 || num === 4) ? (
            <textarea
              value={getInputValue()}
              onChange={(e) => setInputValue(e.target.value)}
              className='h-[80%] w-full bg-gray-900 rounded-lg text-white text-lg p-2'
              placeholder={num === 2 ? 'Enter Description' : 'Enter Tech Stack'}
            />
          ) : num === 3 ? (
            <div>
              <Uploader handleUpload={handleUpload} />
            </div>
          ) : num === 1 ? (
            <TitleComponent  title={title} setTitle={setTitle} yearDone={yearDone} setYear={setYear} member={member} setMember={setMember}  />
          ) : null}

        </div>
        <Toaster richColors />
      </div>
            </BackgroundBeamsDemo>
    </>
  );
};
