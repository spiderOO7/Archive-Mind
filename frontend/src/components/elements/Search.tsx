import './Search.css';
import { useEffect, useState } from 'react';
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { BentoGridDemo } from '../ui/BentoGridComponent';


function Search({open}:{open:boolean}) {
    const [animate, setAnimate] = useState(false);
    const words = `WELCOME TO SCHOLAR SAFE`;
     useEffect(()=>{
        setAnimate( true);
     },[])

    return (
        <div className="w-full bg-black flex flex-col items-center px border-green-500 ">
            <div className={`h-[30%] w-[85%] border-2px border-red-500 ${animate ? 'animate-slidedown' : ''}`}>
                <div className={`h-[30%]  border-white flex justify-center ${animate ? 'animate-fadein' : ''}`}>
                    <TextGenerateEffect words={words} />
                </div>
            </div>
            <div className={`h-[70%] w-full border-2px border-white  overflow-auto ${animate ? 'animate-slideup' : ''}`}>
               <BentoGridDemo open={open} />
            </div>
        </div>
    );
}

export default Search;