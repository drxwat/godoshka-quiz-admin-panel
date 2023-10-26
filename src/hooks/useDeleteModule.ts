import { useState } from "react";
import { client } from "../core/client/client";
export const useDeleteModule = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState(-1);

  const handleDelete = async (moduleIdToDelete: number) => {
    try {
      if (moduleIdToDelete !== -1) {
        const { error } = await client
          .from("modules")
          .delete()
          .eq("id", moduleIdToDelete);
        if (error) {
          console.log(error);
        }
      }
      setModuleIdToDelete(-1);
      setConfirmOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Ошибка при удалении", error.message);
      }
    }
  };

  return {
    confirmOpen,
    setConfirmOpen,
    moduleIdToDelete,
    setModuleIdToDelete,
    handleDelete,
  };
};
