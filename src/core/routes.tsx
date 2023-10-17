import { Route, createRoutesFromElements } from "react-router";
import App from "../App";
import { ProtectedRoute } from "./protected.route";
import { client } from "./client/client";
import { ModulesTable } from "../Components/tables/modules.table";
import { LoginForm } from "../Components/Forms/login";
import { NavigationPanel } from "../Components/navigation";

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
          <NavigationPanel />
          <ModulesTable />
        </ProtectedRoute>
      }
    />
  </Route>,
);
