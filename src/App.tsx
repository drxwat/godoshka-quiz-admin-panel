import { Session } from "@supabase/supabase-js";
import { Suspense } from "react";
import { Outlet, useLoaderData } from "react-router";
import { AuthProvider } from "./core/auth/auth.provider";

function App() {
    const session = useLoaderData() as Session | undefined;

    return (
        <Suspense fallback={<div>"Loading..."</div>}>
            <AuthProvider session={session}>
                <Outlet />
            </AuthProvider>
        </Suspense>
    );
}

export default App;
