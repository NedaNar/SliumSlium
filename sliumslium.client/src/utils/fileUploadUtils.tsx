import axios from "axios";

export const getCloudinarySignature = async () => {
  const response = await axios.get(
    "https://localhost:7091/api/FileUpload/cloudinary-signature"
  );
  return response.data;
};

export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const uploadFileToCloudinary = async (
  fileData: string,
  signature: any,
  timestamp: any
) => {
  const payload = new URLSearchParams({
    file: fileData,
    api_key: "247432582582384",
    signature: signature,
    timestamp: timestamp.toString(),
    resource_type: "raw",
  });

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dqwpdqy7x/upload`,
    payload.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};
