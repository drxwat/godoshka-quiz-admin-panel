import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useUserData } from "../hooks/useUserData";
import { useAuth } from "../core/auth/useAuth";
import { GodotLogo } from "../assets/godot.logo";
import { useNavigate } from "react-router";

export const NavigationPanel = () => {
  const { email } = useUserData();
  const logout = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <GodotLogo />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>{email}</Typography>
            <Button color="inherit" onClick={() => logout.signOut()}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
