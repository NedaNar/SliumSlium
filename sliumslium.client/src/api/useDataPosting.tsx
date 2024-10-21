import { useState } from "react";
import axios from "axios";

interface PostResult<T> {
  responseData: T | null;
  error: boolean;
  postData: (data: T) => void;
}

function usePost<T>(endpoint: string): PostResult<T> {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);

  const postData = async (data: T) => {
    try {
      const url = `https://localhost:7091/api/${endpoint}`;
      const response = await axios.post<T>(url, data);

      if (response.status === 201 || response.status === 200) {
        setResponseData(response.data);
      } else {
        setError(true);
      }
    } catch (postError) {
      setError(true);
    } finally {
    }
  };

  return { responseData, error, postData };
}

export default usePost;
