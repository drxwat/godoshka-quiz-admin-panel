import { Database, TablesUpdate } from "../core/client/database.types";

export type ModuleInsert = Database["public"]["Tables"]["modules"]["Insert"];
export type ModuleUpdate = Database["public"]["Tables"]["modules"]["Update"];

export type variable =
  | TablesUpdate<"modules">
  | TablesUpdate<"answers">
  | TablesUpdate<"questions">;

export type IModule = Database["public"]["Tables"]["modules"]["Row"];
