import { MutationFunction } from "@tanstack/query-core";
import { Database, TablesUpdate } from "../core/client/database.types";
import { ModuleWithQuestions, QuestionWithAnswers } from "../core/client/types";

export type ModuleInsert = Database["public"]["Tables"]["modules"]["Insert"];
export type ModuleUpdate = Database["public"]["Tables"]["modules"]["Update"];

export type variable =
  | TablesUpdate<"modules">
  | TablesUpdate<"answers">
  | TablesUpdate<"questions">;

export type IModule = Database["public"]["Tables"]["modules"]["Row"];

export enum QueryKeys {
  modules = "modules",
  questions = "questions",
}

export interface IFormState {
  open: boolean;
  data?: ModuleWithQuestions | QuestionWithAnswers;
}

export type MutateFunc<D, V extends variable> = MutationFunction<D, V>;

export type OptimisticMutationOptions<D, V extends variable> = {
  updateFunc: MutateFunc<D, V>;
  key: QueryKeys;
  optimisticUpdateFn: (variables: V, oldData: variable[]) => variable[];
};
