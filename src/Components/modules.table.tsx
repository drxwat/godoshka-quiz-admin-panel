import { Box, Button } from "@mui/material";
import { useAuth } from "../core/auth/useAuth";

export const ModulesTable = () => {
  const auth = useAuth();

  return (
    <Box>
      <h1>MODULES</h1>
      <Box>
        <Box>Auth status: {`${auth.isAuthenticated}`}</Box>
      </Box>
      <Box>
        <Button
          onClick={() => {
            auth.signIn(
              import.meta.env.VITE_USER_EMAIL ?? "",
              import.meta.env.VITE_USER_PASSWORD ?? ""
            );
          }}
        >
          SingIn
        </Button>
        <Button onClick={() => auth.signOut()}>SignOut</Button>
      </Box>
    </Box>
  );
};
