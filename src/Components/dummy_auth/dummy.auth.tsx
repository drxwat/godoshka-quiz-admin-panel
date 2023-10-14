import { Box, Button } from "@mui/material";
import { useAuth } from "../../core/auth/useAuth";
import { useNavigate } from "react-router";

export const DummyAuth = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Box>
      <h1>AUTH</h1>
      <Box>
        <Box>Auth status: {`${auth.isAuthenticated}`}</Box>
      </Box>
      <Box>
        <Button
          onClick={async () => {
            const result = await auth.signIn(
              import.meta.env.VITE_USER_EMAIL ?? "",
              import.meta.env.VITE_USER_PASSWORD ?? ""
            );
            if (result.data.session) {
              setTimeout(() => navigate("/"));
            }
          }}
        >
          SingIn
        </Button>
        <Button onClick={() => auth.signOut()}>SignOut</Button>
      </Box>
    </Box>
  );
};
