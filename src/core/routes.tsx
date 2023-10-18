import { Route, createRoutesFromElements } from "react-router";
import App from "../App";
import { ProtectedRoute } from "./protected.route";
import { client } from "./client/client";
import { LoginForm } from "../components/forms/login";
import { MainLayout } from "../components/main.layout";
import { ModulesTable } from "../components/tables/modules.table";
import { QuestionsTable } from "../components/tables/questions.table";

export const routes = createRoutesFromElements(
  <Route
    element={<App />}
    loader={() => {
      return client.auth.getSession().then(({ data }) => data.session);
    }}
  >
    <Route path="/auth" element={<LoginForm />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route path="" element={<ModulesTable />}></Route>
      <Route
        loader={async ({ params }) => {
          const { data: question } = await client
            .from("questions")
            .select()
            .filter(`module_id`, "eq", params.moduleId);

          return question;
        }}
        path="/questions/:moduleId"
        element={<QuestionsTable />}
      ></Route>
    </Route>
  </Route>,
);
