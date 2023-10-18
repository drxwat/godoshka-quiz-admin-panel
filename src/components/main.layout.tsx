import { Box } from "@mui/material";
import { NavigationPanel } from "./navigation";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <Box>
      <NavigationPanel></NavigationPanel>
      <Outlet />
    </Box>
  );
};
