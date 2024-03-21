/* eslint-disable react-refresh/only-export-components */
import { Route, createRoutesFromElements } from "react-router";
import App from "../App";
import { ProtectedRoute } from "./protected.route";
import { client } from "./client/client";
import { LoginForm } from "../components/forms/login";
import { MainLayout } from "../components/main.layout";

import { lazy } from "react";

const ModulesTable = lazy(
  async () => await import("../components/modules.table"),
);

const QuestionsTable = lazy(
  async () => await import("../components/questions.table"),
);

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
      <Route path="/questions/:moduleId" element={<QuestionsTable />}></Route>
    </Route>
  </Route>,
);
