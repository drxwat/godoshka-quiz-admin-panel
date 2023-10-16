import { Database } from "./../core/client/database.types";
import { useEffect, useState } from "react";
import { client } from "../core/client/client";

type Row = Database["public"]["Tables"]["modules"]["Row"];
export const useModules = () => {
  const [modules, setModules] = useState<Row[]>([]);
  const getModulesList = async () => {
    try {
      const { data } = await client.from("modules").select();
      if (data) {
        setModules(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    getModulesList();
  }, []);
  return { modules };
};
