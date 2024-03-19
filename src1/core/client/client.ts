import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
);
