import { useState } from "react";
import { client } from "../core/client/client";

export const useAddModule = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleSave = async () => {
    try {
      const currentDate = new Date().toISOString();
      const dataToInsert = {
        name: name,
        description: description,
        created_at: currentDate,
      };
      const { error } = await client.from("modules").insert([dataToInsert]);
      if (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  return {
    name,
    description,
    handleNameChange,
    handleDescriptionChange,
    handleSave,
  };
};
