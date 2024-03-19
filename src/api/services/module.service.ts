import { client } from "../../core/client/client";
import { IModule, ModuleInsert, ModuleUpdate } from "../../helpers/types";

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
    const { data } = await client.from("modules").delete().eq("id", module.id);

    return data;
  }

  async update(module: ModuleUpdate) {
    const { data } = await client
      .from("modules")
      .update({ ...module })
      .eq("id", module.id!);
    return data;
  }
}

export default new ModuleService();
