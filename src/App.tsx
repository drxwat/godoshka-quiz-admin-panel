import { Box } from "@mui/material";
import { Suspense } from "react";

function App() {
  // const email = import.meta.env.VITE_USER_EMAIL;
  // const password = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;
  // const client = await buildClient(email, password);

  return (
    <Suspense fallback={<div>"Loading..."</div>}>
      <Box>
        <button>Request</button>
      </Box>
    </Suspense>
  );
}

export default App;
