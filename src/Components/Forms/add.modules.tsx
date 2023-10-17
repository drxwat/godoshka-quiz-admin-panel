import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useAddModule } from "../../hooks/useAddModule";

interface AddModulesFormProps {
  open: boolean;
  handleClose: () => void;
  refreshModules: () => void;
}

export const AddModulesForm: React.FC<AddModulesFormProps> = ({
  open,
  handleClose,
  refreshModules,
}) => {
  const { handleNameChange, handleDescriptionChange, handleSave } =
    useAddModule();

  return (
    <Dialog open={open} onClose={handleClose}>
      <form
        onSubmit={async () => {
          await handleSave();
          await refreshModules();
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContentText
            sx={{
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Create new module
          </DialogContentText>
          <TextField
            label="Name"
            sx={{ marginBottom: 1 }}
            onChange={handleNameChange}
          />
          <TextField label="Description" onChange={handleDescriptionChange} />
          <DialogActions>
            <Button color="primary" type="submit" onClick={handleClose}>
              Сохранить
            </Button>
            <Button onClick={handleClose} color="primary">
              Отменить и закрыть
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};
