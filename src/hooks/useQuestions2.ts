import { useState } from "react";
import { client } from "../core/client/client";
import { Database } from "../core/client/database.types";
import { useParams } from "react-router";

type QuestionInsert = Database["public"]["Tables"]["questions"]["Insert"];

export const useAddQuestion = () => {
  const stringID = useParams();
  const [question, setQuestion] = useState("");
  const [questionTime, setQuestionTime] = useState<number>(20);
  const [answerData, setAnswerData] = useState({
    text: "",
    is_correct: false,
  });
  let moduleID: number | undefined;

  if (typeof stringID === "string") {
    moduleID = +stringID;
  }

  const handleFieldCange = (
    field: keyof QuestionInsert,
    value: string | number,
  ) => {
    setAnswerData({ ...answerData, [field]: value });
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
        await client.from("answers").insert({
          question_id: func,
          text: answerData.text,
          is_correct: answerData.is_correct,
        });
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
    if (moduleID !== undefined) {
      const questionId = await addQuestion(moduleID);
      addAnswer(questionId);
    }
  };

  //   const [answer1, setAnswer1] = useState("");
  //   const [answer2, setAnswer2] = useState("");
  //   const [answer3, setAnswer3] = useState("");
  //   const [answer4, setAnswer4] = useState("");
  //   const [isCorrect1, setIsCorrect1] = useState(false);
  //   const [isCorrect2, setIsCorrect2] = useState(false);
  //   const [isCorrect3, setIsCorrect3] = useState(false);
  //   const [isCorrect4, setIsCorrect4] = useState(false);

  //   const addQuestion1 = async (moduleID: number) => {
  //     const { data, error } = await client
  //       .from("questions")
  //       .insert({
  //         text: question,
  //         time_to_answer: questionTime,
  //         module_id: moduleID,
  //       })
  //       .select();
  //     if (data) {
  //       console.log("Вопрос создан");
  //       const questionid = data[0].id;
  //       console.log("ID получен", questionid);
  //       const answersData = [
  //         { text: answer1, is_correct: isCorrect1 },
  //         { text: answer2, is_correct: isCorrect2 },
  //         { text: answer3, isCorrect3 },
  //         { text: answer4, isCorrect4 },
  //       ];

  //       await client.from("answers").insert(
  //         answersData.map((answer) => ({
  //           ...answer,
  //           question_id: questionid,
  //         })),
  //       );
  //     } else if (error) {
  //       console.log("Ошибка создания вопроса", error);
  //     }
  //   };

  return {
    setQuestion,
    hanldeSave,
    setQuestionTime,
    handleFieldCange,
    // answer1,
    // setAnswer1,
    // answer2,
    // setAnswer2,
    // answer3,
    // setAnswer3,
    // answer4,
    // setAnswer4,
    // isCorrect1,
    // setIsCorrect1,
    // isCorrect2,
    // setIsCorrect2,
    // isCorrect3,
    // setIsCorrect3,
    // isCorrect4,
    // setIsCorrect4,
  };
};
