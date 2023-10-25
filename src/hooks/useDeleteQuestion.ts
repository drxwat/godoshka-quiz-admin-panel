import { client } from "../core/client/client";

export const useDeleteQuestion = () => {
  const handleDelete = async (questionId: number) => {
    try {
      await client
        .from("questions")
        .delete()
        .eq("id", questionId ?? -1);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Ошибка при удалении", error.message);
      }
    }
  };

  return { handleDelete };
};
