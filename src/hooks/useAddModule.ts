import { useState } from "react";
import { client } from "../core/client/client";
import { Database } from "../core/client/database.types";

type ModuleInsert = Database["public"]["Tables"]["modules"]["Insert"];

export const useAddModule = () => {
  const [module, setModule] = useState<ModuleInsert>({
    name: "",
    description: "",
    min_questions: 10,
    quiz_question_amount: 10,
  });

  const handleFieldChange = (
    field: keyof ModuleInsert,
    value: string | number,
  ) => {
    setModule({ ...module, [field]: value });
  };

  const handleSave = async () => {
    try {
      const { error } = await client.from("modules").insert([module]);
      if (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  return {
    module,
    handleFieldChange,
    handleSave,
  };
};
