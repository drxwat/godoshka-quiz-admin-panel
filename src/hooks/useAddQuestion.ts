import { useEffect, useState } from "react";
import { client } from "../core/client/client";
import { useParams } from "react-router";
import { Database } from "../core/client/database.types";

type AnswerInsert = Omit<
  Database["public"]["Tables"]["answers"]["Insert"],
  "question_id"
>;
type QuestionInsert = Database["public"]["Tables"]["questions"]["Insert"];
type QuestionWithAnswers = QuestionInsert & { answers: AnswerInsert[] };

const INITIAL_TIME_TO_ANSWER = 20;
const INITIAL_ANSWERS: AnswerInsert[] = [{ text: "Да" }, { text: "Нет" }];

export const useAddQuestion = (questionId?: number) => {
  const params = useParams();
  const moduleId = parseInt(params.moduleId ?? "");

  const [question, setQuestion] = useState<QuestionWithAnswers>({
    module_id: moduleId,
    text: "",
    time_to_answer: INITIAL_TIME_TO_ANSWER,
    answers: INITIAL_ANSWERS,
  });

  const fetchQuestionWithAnswers = async (questionId: number) => {
    const { data } = await client
      .from("questions")
      .select("*, answers(*)")
      .filter("id", "eq", questionId);
    if (data && data.length > 0) {
      setQuestion(data[0]);
    }
  };

  useEffect(() => {
    if (typeof questionId === "number") {
      fetchQuestionWithAnswers(questionId);
    }
  }, [questionId]);

  const handleFieldChange = (
    field: keyof QuestionWithAnswers,
    value: unknown,
  ) => {
    setQuestion({ ...question, [field]: value });
  };

  const hanldeSave = async () => {
    await createQuestion(question);
  };

  return {
    question,
    hanldeSave,
    handleFieldChange,
  };
};

const createQuestion = async (question: QuestionWithAnswers) => {
  try {
    const { text, time_to_answer, module_id, answers } = question;
    const { data } = await client
      .from("questions")
      .insert({
        text,
        time_to_answer,
        module_id,
      })
      .select();
    if (data && data.length > 0) {
      console.log("Вопрос создан");
      const question_id = data[0].id;

      try {
        await client.from("answers").insert(
          answers.map((answer) => {
            return {
              text: answer.text,
              is_correct: !!answer.is_correct,
              question_id,
            };
          }),
        );

        return question_id;
      } catch (addAnswerError) {
        if (addAnswerError instanceof Error) {
          console.log(
            "Ошибка добавления ответов, удаляю вопрос...",
            addAnswerError.message,
          );
        }

        await client.from("questions").delete().eq("id", question_id);
        throw addAnswerError;
      }
    }
    throw new Error("ID вопроса не получен");
  } catch (addQuestionError) {
    if (addQuestionError instanceof Error) {
      console.error("Ошибка при создании вопроса", addQuestionError.message);
    }
    throw addQuestionError;
  }
};
