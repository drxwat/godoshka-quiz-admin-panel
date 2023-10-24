import { useEffect, useState } from "react";
import { client } from "../core/client/client";
import { useParams } from "react-router";
import { Database } from "../core/client/database.types";

type AnswerInsert = Omit<
  Database["public"]["Tables"]["answers"]["Insert"],
  "question_id"
>;

type AnswerUpdate = Database["public"]["Tables"]["answers"]["Update"];
type QuestionInsert = Database["public"]["Tables"]["questions"]["Insert"];
type QuestionWithAnswers = QuestionInsert & { answers: AnswerInsert[] };

const INITIAL_TIME_TO_ANSWER = 20;
const INITIAL_ANSWERS: AnswerInsert[] = [
  { text: "Да" },
  { text: "Нет" },
  { text: "" },
  { text: "" },
];

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
      const dataAnswers: QuestionWithAnswers[] = [...data];
      for (let i = 0; 4 - dataAnswers[0].answers.length > 0; i++) {
        dataAnswers[0].answers.push({ text: "" });
      }
      setQuestion(dataAnswers[0]);
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
  const updateQuestion = async (
    questionId: number,
    question: QuestionWithAnswers,
  ) => {
    if (questionId && typeof questionId === "number") {
      const { text, time_to_answer, module_id, answers } = question;
      try {
        await client
          .from("questions")
          .update({
            text,
            module_id,
            time_to_answer,
          })
          .eq("id", questionId);
        console.log("Вопрос обновлен успешно.");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Ошибка при обновлении вопроса:", error.message);
        }
      }
      try {
        const updateAnswer: AnswerUpdate[] = answers
          .filter((answer) => answer.id)
          .map((answer) => {
            return {
              question_id: questionId,
              id: answer.id,
              text: answer.text,
              is_correct: !!answer.is_correct,
            };
          });

        await client
          .from("answers")
          .update(updateAnswer)
          .eq(
            "id",
            updateAnswer.map((answer) => answer.id),
          );
      } catch (error) {
        if (error instanceof Error) {
          console.error("Ошибка обновления ответов", error.message);
        }
      }

      try {
        const insertAnswer = answers
          .filter((answer) => !answer.id)
          .map((answer) => {
            return {
              question_id: questionId,
              text: answer.text,
              is_correct: !!answer.is_correct,
            };
          });

        await client.from("answers").insert(insertAnswer);
      } catch (error) {
        if (error instanceof Error) {
          console.log("Новые ответы не добавлены, повторите", error.message);
        }
      }
    }
  };

  const hanldeSave = async () => {
    console.log("save");
    await createQuestion(question);
  };
  const hanldeUpdate = async () => {
    console.log("update");
    if (questionId) await updateQuestion(questionId, question);
  };

  return {
    question,
    hanldeSave,
    handleFieldChange,
    hanldeUpdate,
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
        const filteredAnswers = answers
          .filter((answer) => answer && answer.text)
          .map((answer) => {
            return {
              question_id,
              text: answer.text,
              is_correct: !!answer.is_correct,
            };
          });
        await client.from("answers").insert(filteredAnswers);

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
