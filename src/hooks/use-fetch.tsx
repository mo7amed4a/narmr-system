import api from "@/lib/axios";
import { useEffect, useState } from "react";

const useFetch = (url: string, refresh?: boolean) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    api
      .get(url)
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [refresh]);
  return { data, loading, error };
};

export default useFetch;
