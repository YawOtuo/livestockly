// cloudinaryService.js
import axios from "axios";

const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gwxgv5ii");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/daurieb51/image/upload",
      formData
    );

    return response.data.public_id;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // rethrow the error to be caught by the caller
  }
};

export { uploadToCloudinary };

const handleFileDrop = async (files: any, setFiles: any) => {
  if (files?.length) {
    const uploadedFiles = await Promise.all(
      files.map(async (file: any) => {
        try {
          const public_id: string = await uploadToCloudinary(file);
          return public_id;
        } catch (error) {
          console.error("Error uploading image:", error);
          return null;
        }
      })
    );
    setFiles((previousFiles: any) => [
      ...(Array.isArray(previousFiles) ? previousFiles : []), // Ensure previousFiles is an array
      ...uploadedFiles.filter(Boolean),
    ]);
  }
};

export { handleFileDrop };
