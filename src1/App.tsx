import { CssBaseline } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import { Outlet, useLoaderData } from "react-router";
import { AuthProvider } from "./core/auth/auth.provider";

function App() {
  const session = useLoaderData() as Session | undefined;

  return (
    <>
      <CssBaseline />
      <AuthProvider session={session}>
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
