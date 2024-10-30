import { useState } from "react";
import axios from "axios";

interface PostResult<RequestType, ResponseType> {
  responseData: ResponseType | null;
  error: boolean;
  postData: (data: RequestType) => void;
}

function usePost<RequestType, ResponseType>(
  endpoint: string
): PostResult<RequestType, ResponseType> {
  const [responseData, setResponseData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<boolean>(false);

  const postData = async (data: RequestType) => {
    try {
      const url = `https://localhost:7091/api/${endpoint}`;
      const response = await axios.post<ResponseType>(url, data);

      if (response.status === 201 || response.status === 200) {
        setResponseData(response.data);
      } else {
        setError(true);
      }
    } catch (postError) {
      setError(true);
    }
  };

  return { responseData, error, postData };
}

export default usePost;
