import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

export const useFetchData = <T>(
  fetcher: () => Promise<PostgrestSingleResponse<T[]>>,
) => {
  const [oldData, setOldData] = useState<T[] | undefined>();
  const [data, setData] = useState<T[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = (config?: { fakeData?: T[]; revalidate?: boolean }) => {
    if (data) {
      setOldData(data);
    }
    if (config?.fakeData) {
      setData(config.fakeData);
    }
    if (config?.revalidate !== false) {
      setIsLoading(true);
    }
  };

  const revertData = () => {
    setData(oldData);
  };

  const getData = useCallback(async () => {
    const { data: fetcherData } = await fetcher();
    if (fetcherData) {
      setData(fetcherData);
    }
  }, [fetcher]);

  useEffect(() => {
    if (isLoading) {
      try {
        getData();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [isLoading, getData]);

  return { data, isLoading, refreshData, revertData };
};
