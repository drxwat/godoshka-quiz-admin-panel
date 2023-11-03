import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Database } from "../core/client/database.types";
import { client } from "../core/client/client";

type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];
type AnswersRow = Database["public"]["Tables"]["answers"]["Row"];

export const useQuestion = () => {
  const { moduleId } = useParams();
  const [answers, setAnswers] = useState<AnswersRow[]>([]);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  const getQuestionsList = async (moduleId: string | "") => {
    const { data } = await client
      .from("questions")
      .select()
      .eq("module_id", moduleId);
    const answersData = await client.from("answers").select();
    if (data && answersData.data) {
      console.log(answersData.data);
      setQuestions(data);
      setAnswers(answersData.data);
    }
  };
  const refreshQuestion = () => {
    setFetchingData(true);
  };

  useEffect(() => {
    if (fetchingData) {
      try {
        getQuestionsList(moduleId ?? "");
      } catch (error) {
        if (error instanceof Error) {
          console.log("Ошибка получения данных", error.message);
        }
      } finally {
        setFetchingData(false);
      }
    }
  }, [fetchingData, moduleId]);

  return { questions, refreshQuestion, moduleId, answers };
};
