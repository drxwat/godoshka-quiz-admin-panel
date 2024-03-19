import { AuthTokenResponse } from "@supabase/supabase-js";
import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nopeFn: () => Promise<any> = () => Promise.resolve();

interface AuthenticationContext {
  signIn: (email: string, password: string) => Promise<AuthTokenResponse>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthenticationContext>({
  signIn: nopeFn,
  signOut: nopeFn,
  isAuthenticated: false,
});
