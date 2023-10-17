import { Database } from "./../core/client/database.types";
import { useEffect, useState } from "react";
import { client } from "../core/client/client";

type Row = Database["public"]["Tables"]["modules"]["Row"];
export const useModules = () => {
  const [modules, setModules] = useState<Row[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  const getModulesList = async () => {
    const { data } = await client.from("modules").select();
    if (data) {
      setModules(data);
    }
  };
  const refreshModules = () => {
    setFetchingData(true);
  };
  useEffect(() => {
    if (fetchingData) {
      try {
        getModulesList();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setFetchingData(false);
      }
    }
  }, [fetchingData]);

  return { modules, refreshModules };
};
