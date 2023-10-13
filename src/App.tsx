import { Suspense } from "react";

function App() {
  // const email = import.meta.env.VITE_USER_EMAIL;
  // const password = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;
  // const client = await buildClient(email, password);

  return (
    <Suspense fallback={<div>"Loading..."</div>}>
      <button>Request</button>
    </Suspense>
  );
}

export default App;
