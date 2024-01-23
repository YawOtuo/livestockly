import ImageAddIcon from "@/components/icons/CaImageAdd";
import { handleFileDrop } from "./api";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export const AccountAddImage = ({ setFiles }: Props) => {
    const onDrop = useCallback(
      (acceptedFiles: any) => {
        handleFileDrop(acceptedFiles, setFiles);
      },
      [setFiles]
    );
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
      <div 
        {...getRootProps({})}
        className=" w-full rounded-2xl flex items-center justify-start">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <div className=" gap-2 text-yellow1 box-[1px_3px_13px_0px_rgba(0,0,0,0.10)] border-[1px] border-yellow4 max-w-[177px] max-h-[18px] aspect-[100/38]  w-full min-h-[38px] flex items-center justify-center rounded-lg text-[13px] cursor-pointer">
            <p className=" whitespace-nowrap">Change Image</p>
            <ImageAddIcon />
          </div>
        )}
      </div>
    );
  };