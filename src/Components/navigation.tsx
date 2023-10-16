import { Box, Button, Typography } from "@mui/material";
import { useUserData } from "../hooks/useUserData";
import { useAuth } from "../core/auth/useAuth";

export const NavigationPanel = () => {
  const { email } = useUserData();
  const logout = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Typography>Привет, {email}</Typography>
      <Button onClick={() => logout.signOut()}>Выйти</Button>
    </Box>
  );
};
