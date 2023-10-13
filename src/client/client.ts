import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const buildClient = async (email: string, password: string) => {
  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_PROJECT_URL,
    import.meta.env.VITE_SUPABASE_PUBLIC_KEY
  );

  await supabase.auth.signInWithPassword({ email, password });

  return supabase;
};
