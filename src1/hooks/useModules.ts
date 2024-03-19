import { useEffect, useState } from "react";
import { client } from "../core/client/client";
import { ModuleWithQuestions } from "../core/client/types";

export const useModules = () => {
  const [modules, setModules] = useState<ModuleWithQuestions[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  const getModulesList = async () => {
    const { data } = await client.from("modules").select("*,questions(*)");
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
