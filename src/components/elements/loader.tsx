import { Box, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "50vh" }}
    >
      <CircularProgress style={{ width: "200px", height: "200px" }} />
    </Box>
  );
};
