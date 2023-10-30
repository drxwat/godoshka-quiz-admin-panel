import { Database } from "./../core/client/database.types";
import { useEffect, useState } from "react";
import { client } from "../core/client/client";

type Row = Database["public"]["Tables"]["modules"]["Row"];
export const useModules = () => {
  const [modules, setModules] = useState<Row[]>([]);
  const [questionCountArr, setQuestionCountArr] =
    useState<{ module_id: number }[]>();
  const [fetchingData, setFetchingData] = useState(true);

  const getModulesList = async () => {
    const { data } = await client.from("modules").select();
    const questionCount = await client
      .from("questions")
      .select("module_id", { count: "exact" });
    if (data && questionCount.data) {
      setModules(data);
      setQuestionCountArr(questionCount.data);
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

  return { modules, refreshModules, questionCountArr };
};
