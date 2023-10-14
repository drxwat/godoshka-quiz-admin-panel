import { Route, createRoutesFromElements } from "react-router";
import App from "../App";
import { ProtectedRoute } from "./protected.route";
import { client } from "./client/client";
import { DummyAuth } from "../components/dummy_auth/dummy.auth";
import { ModulesTable } from "../components/tables/modules.table";

export const routes = createRoutesFromElements(
  <Route
    element={<App />}
    loader={() => {
      return client.auth.getSession().then(({ data }) => data.session);
    }}
  >
    <Route path="/auth" element={<DummyAuth />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <ModulesTable />
        </ProtectedRoute>
      }
    />
  </Route>
);
