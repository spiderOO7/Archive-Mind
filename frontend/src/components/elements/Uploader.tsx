// import React, { useState } from "react";
import { FileUpload } from "../ui/file-upload";

export function Uploader({ handleUpload,  }: { handleUpload: (files: File[]) => void;  }) {
    // const [files, setFiles] = useState<File[]>([]);
    // const handleFileUpload = (files: File[]) => {
    //     setFiles(files);
    //     handleUpload(files);
    //     console.log(files);
    // };
    return (
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-gray-900 border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleUpload} />
        </div>
    );
}
