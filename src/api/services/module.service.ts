import { client } from "../../core/client/client";
import { Database } from "../../core/client/database.types";
import { ModuleInsert, ModuleUpdate } from "../../helpers/types";

type IModule = Database["public"]["Tables"]["modules"]["Row"];

class ModuleService {
  async getAllModulesWithQuestions() {
    const { data } = await client
      .from("modules")
      .select("*,questions(*)")
      .order("created_at");
    return data;
  }

  async add(module: ModuleInsert) {
    const { data } = await client.from("modules").insert([module]);
    return data;
  }
  async remove(module: IModule) {
    return await client.from("modules").delete().eq("id", module.id);
  }

  async published(module: ModuleUpdate) {
    return await client
      .from("modules")
      .update({ is_published: module.is_published })
      .eq("id", module.id!);
  }
}

export default new ModuleService();
