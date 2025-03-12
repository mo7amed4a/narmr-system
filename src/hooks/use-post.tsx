import api from "@/lib/axios";
import { useEffect, useState } from "react";

const usePost = (url: string, payload: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    api
      .post(url, payload)
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);
  return { data, loading, error };
};

export default usePost;
