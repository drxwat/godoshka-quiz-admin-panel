import { client } from "../../core/client/client";

class QuestionService {
  async getAllQuestionsWithAnswers(moduleId: number) {
    const { data } = await client
      .from("questions")
      .select("*, answers(*)")
      .eq("module_id", moduleId)
      .order("created_at");
    return data;
  }
}

export default new QuestionService();
