import { Database } from "./database.types";

export type Module = Database["public"]["Tables"]["modules"]["Row"];
export type Question = Database["public"]["Tables"]["questions"]["Row"];

export type ModuleWithQuestions = Module & { questions: Question[] };
