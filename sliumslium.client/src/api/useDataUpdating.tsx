import { useState } from "react";
import axios from "axios";

interface PutResult<RequestType, ResponseType> {
  responseData: ResponseType | null;
  error: boolean;
  updateData: (data: RequestType, endpoint: string) => void;
}

function useUpdate<RequestType, ResponseType>(): PutResult<
  RequestType,
  ResponseType
> {
  const [responseData, setResponseData] = useState<ResponseType | null>(null);
  const [error, setError] = useState(false);

  const updateData = async (data: RequestType, endpoint: string) => {
    try {
      const url = `https://localhost:7091/api/${endpoint}`;
      const response = await axios.put<ResponseType>(url, data);

      if (
        response.status === 201 ||
        response.status === 204 ||
        response.status === 200
      ) {
        setResponseData(response.data);
      } else {
        setError(true);
      }
    } catch (putError) {
      setError(true);
    } finally {
    }
  };

  return { responseData, error, updateData };
}

export default useUpdate;
