import { Box } from "@mui/material";
import { NavigationPanel } from "./navigation";
import { Outlet } from "react-router";
import { Suspense } from "react";
import { Loader } from "./elements/loader";

export const MainLayout = () => {
  return (
    <Box>
      <NavigationPanel></NavigationPanel>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Box>
  );
};
