import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { client } from "../../core/client/client";

export const AddModulesForm = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlerDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const currentDate = new Date().toISOString();

      const dataToInsert = {
        name: name,
        description: description,
        created_at: currentDate,
      };

      // Вызовите метод insert для вставки данных в таблицу
      const { error } = await client
        .from("modules")
        .insert([dataToInsert])
        .select();
      if (error) {
        console.error("Ошибка при отправке данных:", error);
      } else {
        handleClose();
      }
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSave}>
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
            onChange={handlerName}
          />
          <TextField label="Description" onChange={handlerDescription} />
          <DialogActions>
            <Button color="primary" type="submit">
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
