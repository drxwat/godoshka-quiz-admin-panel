import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IAddBtn {
  handleOpen: () => void;
}

export const AddBtn: React.FC<IAddBtn> = ({ handleOpen }) => {
  return (
    <Fab
      color="primary"
      sx={{
        position: "fixed",
        bottom: "16px",
        right: "48px",
      }}
      onClick={handleOpen}
    >
      <AddIcon />
    </Fab>
  );
};
