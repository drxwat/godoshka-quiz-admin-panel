import { client } from "../../core/client/client";
import { QuestionWithAnswers } from "../../core/client/types";

class QuestionService {
  async getAllQuestionsWithAnswers(moduleId: number) {
    const { data } = await client
      .from("questions")
      .select("*, answers(*)")
      .eq("module_id", moduleId)
      .order("created_at");
    return data;
  }

  async remove(question: QuestionWithAnswers) {
    const { data } = await client
      .from("questions")
      .delete()
      .eq("id", question.id!);

    return data;
  }
  async add(question: QuestionWithAnswers) {
    const { data, error } = await client
      .from("questions")
      .insert({
        text: question.text,
        time_to_answer: question.time_to_answer,
        module_id: question.module_id,
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    const answersToInsert = question.answers
      .filter((item) => item.text !== "")
      .map((answer) => ({
        ...answer,
        question_id: data[0].id,
      }));

    const { data: response, error: answersError } = await client
      .from("answers")
      .insert(answersToInsert);

    if (answersError) {
      throw new Error(answersError.message);
    }

    return response;
  }

  async update(question: QuestionWithAnswers) {
    if (question.id === undefined) {
      throw new Error("Нет question id");
    }

    const { data: questionData, error: questionError } = await client
      .from("questions")
      .update({
        text: question.text,
        time_to_answer: question.time_to_answer,
        module_id: question.module_id,
      })
      .eq("id", question.id)
      .select();

    if (questionError || !questionData) {
      throw new Error(questionError.message);
    }

    const { error: removeError } = await client
      .from("answers")
      .delete()
      .eq("question_id", questionData[0].id);

    if (removeError) {
      throw new Error(removeError.message);
    }

    const answersToInsert = question.answers
      .filter((item) => item.text !== "")
      .map((answer) => ({
        ...answer,
        question_id: questionData[0].id,
      }));

    const { data: response, error: answersError } = await client
      .from("answers")
      .insert(answersToInsert);

    if (answersError) {
      throw new Error(answersError.message);
    }

    return response;
  }
}

export default new QuestionService();
