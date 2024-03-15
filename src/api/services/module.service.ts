import { client } from "../../core/client/client";
import { ModuleInsert } from "../../helpers/types";

class ModuleService {
  async getAllModulesWithQuestions() {
    return await client
      .from("modules")
      .select("*,questions(*)")
      .order("created_at");
  }

  async add(module: ModuleInsert) {
    return await client.from("modules").insert([module]);
  }
  async remove(id: number) {
    return await client.from("modules").delete().eq("id", id);
  }

  async published(isPublished: boolean, id: number) {
    return await client
      .from("modules")
      .update({ is_published: isPublished })
      .eq("id", id);
  }
}

export default new ModuleService();
