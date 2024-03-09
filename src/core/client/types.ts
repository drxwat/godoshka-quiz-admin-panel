import { Database } from "./database.types";

export type Module = Database["public"]["Tables"]["modules"]["Row"];
export type Question = Database["public"]["Tables"]["questions"]["Row"];

export type ModuleWithQuestions = Module & { questions: Question[] };

export type AnswerInsert = Omit<
  Database["public"]["Tables"]["answers"]["Insert"],
  "question_id"
> & { question_id?: number };
export type Answer = Database["public"]["Tables"]["answers"]["Row"];

export type QuestionInsert =
  Database["public"]["Tables"]["questions"]["Insert"];
export type QuestionWithAnswers = QuestionInsert & { answers: AnswerInsert[] };

export type QuestionUpdateWithAnswers = Question & { answers: Answer[] };

export type Tables = keyof Database["public"]["Tables"];
