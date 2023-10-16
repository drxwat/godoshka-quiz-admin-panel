import { client } from "../core/client/client";
import { useState, useEffect } from "react";

export const useUserData = () => {
  const [email, setEmail] = useState<string>("");

  const getUserInfo = async () => {
    try {
      const { data, error } = await client.auth.getUser();
      if (error) {
        console.error("Ошибка получения данных о пользователе:", error.message);
      } else {
        setEmail(data.user.email || "");
      }
    } catch (error) {
      if (error instanceof Error) console.error("Ошибка:", error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return { email };
};
