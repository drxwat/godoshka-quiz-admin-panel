import { useState } from "react";
import { client } from "../core/client/client";
export const useUpdateModule = () => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [moduleIdToUpdate, setModuleIdToUpdate] = useState(-1);
  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState<string | null>("");

  const handleUpdate = async () => {
    try {
      if (moduleIdToUpdate !== -1) {
        const currentDate = new Date().toISOString();
        const { error } = await client
          .from("modules")
          .update({
            name: updateName,
            description: updateDescription,
            updated_at: currentDate,
          })
          .eq("id", moduleIdToUpdate);
        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Ошибка при изменении данных", error.message);
      }
    } finally {
      setUpdateOpen(false);
      setModuleIdToUpdate(-1);
    }
  };

  return {
    updateOpen,
    setUpdateOpen,
    updateName,
    setUpdateName,
    updateDescription,
    setUpdateDescription,
    handleUpdate,
    setModuleIdToUpdate,
  };
};
