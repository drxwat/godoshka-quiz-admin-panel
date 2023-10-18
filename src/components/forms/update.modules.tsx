import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface UpdateModulesProps {
  open: boolean;
  handleClose: () => void;
  handleUpdate: () => void;
  updateName: string;
  updateDescription: string | null;
  setUpdateName: (name: string) => void;
  setUpdateDescription: (description: string | null) => void;
}

export const UpdateModules: React.FC<UpdateModulesProps> = ({
  open,
  handleClose,
  handleUpdate,
  updateName,
  updateDescription,
  setUpdateName,
  setUpdateDescription,
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUpdateDescription(event.target.value);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleUpdate}>
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
            Edit module
          </DialogContentText>
          <TextField
            label="Name"
            sx={{ marginBottom: 1 }}
            onChange={handleNameChange}
            value={updateName}
          />
          <TextField
            label="Description"
            onChange={handleDescriptionChange}
            value={updateDescription}
          />
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
