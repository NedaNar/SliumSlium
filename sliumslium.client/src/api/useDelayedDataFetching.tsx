import { useState } from "react";
import axios from "axios";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
  fetchData: () => void;
}

function useDelayedFetch<T>(endpoint: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://localhost:7091/api/${endpoint}`;
      const response = await axios.get<T>(url);
      setData(response.data);
    } catch (fetchError) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export default useDelayedFetch;
