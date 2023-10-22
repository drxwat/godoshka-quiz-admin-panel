import { useState } from "react";
import { client } from "../core/client/client";
// import { Database } from "../core/client/database.types";

// type QuestionInsert = Database["public"]["Tables"]["answers"]["Insert"];

export const useAddQuestion = () => {
  const [moduleId, setModuleId] = useState<number | undefined>(undefined);
  const [question, setQuestion] = useState("");
  const [questionTime, setQuestionTime] = useState<number>();
  //   const [answerData1, setAnswerData1] = useState({
  //     text: "",
  //     is_correct: false,
  //   });
  //   const [answerData2, setAnswerData2] = useState({
  //     text: "",
  //     is_correct: false,
  //   });
  //   const [answerData3, setAnswerData3] = useState({
  //     text: "",
  //     is_correct: false,
  //   });
  //   const [answerData4, setAnswerData4] = useState({
  //     text: "",
  //     is_correct: false,
  //   });

  const initialAnswers = [
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ];
  const [answers, setAnswers] = useState(initialAnswers);

  //   const handleFieldCange = (
  //     field: keyof QuestionInsert,
  //     value: string | number,
  //   ) => {
  //     setAnswerData1({ ...answerData1, [field]: value });
  //     setAnswerData2({ ...answerData2, [field]: value });
  //     setAnswerData3({ ...answerData3, [field]: value });
  //     setAnswerData4({ ...answerData4, [field]: value });
  //   };
  const handleFieldChange = (
    index: number,
    field: "text" | "is_correct",
    value: string | boolean,
  ) => {
    const updatedAnswers = [...answers];
    if (updatedAnswers[index][field] === "is_correct") {
      value === "on" ? (value = true) : (value = false);
    }
    setAnswers(updatedAnswers);
  };

  const addQuestion = async (moduleId: number) => {
    try {
      const { data } = await client
        .from("questions")
        .insert({
          text: question,
          time_to_answer: questionTime,
          module_id: moduleId,
        })
        .select();
      if (data) {
        console.log("Вопрос создан");
        const questionId = data[0].id;
        return questionId;
      } else {
        return "ID не получено";
      }
    } catch (addQuestionError) {
      if (addQuestionError instanceof Error) {
        console.log("Ошибка при создании вопроса", addQuestionError.message);
      }
    }
  };
  const addAnswer = async (func: number | string | undefined) => {
    if (typeof func === "string" || typeof func === "undefined") {
      console.log("ID вопроса не получен, ответы не будут добавлены");
      return;
    } else {
      try {
        for (const answer of answers) {
          await client.from("answers").insert([
            {
              text: answer.text,
              is_correct: answer.is_correct,
              question_id: func,
            },
          ]);
        }
      } catch (addAnswerError) {
        if (addAnswerError instanceof Error) {
          console.log(
            "Ошибка добавления ответов, удаляю вопрос...",
            addAnswerError.message,
          );
        }
      }
    }
  };
  const hanldeSave = async () => {
    console.log("Модуль ID:", moduleId);
    if (moduleId !== undefined) {
      const questionId = await addQuestion(moduleId);
      addAnswer(questionId);
    } else {
      console.log("moduleId не определен, вопрос не будет создан");
    }
  };

  return {
    setQuestion,
    setQuestionTime,
    setModuleId,
    hanldeSave,
    handleFieldChange,
    answers,
  };
};
