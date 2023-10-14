import { Session } from "@supabase/supabase-js";
import { FC, ReactNode, useState } from "react";
import { AuthContext } from "./auth.context";
import { client } from "../client/client";

export const AuthProvider: FC<{
  session?: Session;
  children: ReactNode;
}> = ({ session, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!session);

  const signIn = async (email: string, password: string) => {
    const result = await client.auth.signInWithPassword({ email, password });
    setIsAuthenticated(!!result.data.session);
    return result;
  };

  const signOut = async () => {
    await client.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
