import Logger from "@/lib/logger";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useData = <T,>(fetchCallback: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ac = new AbortController();

    const getData = () => {
      setIsLoading(true);
      fetchCallback()
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          if (error.name === "AbortError") return;

          Logger.error(error);
          toast.error("Unable to retrieve data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getData();
    return () => {
      ac.abort("abort");
    };
  }, [fetchCallback]);

  return { data, isLoading };
};
