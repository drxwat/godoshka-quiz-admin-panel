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
  const { module, handleFieldChange, handleSave } = useAddModule();

  return (
    <Dialog open={open} onClose={handleClose}>
      <form
        onSubmit={async () => {
          await handleSave();
          refreshModules();
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
            label="Название модуля"
            sx={{ marginBottom: 1 }}
            value={module.name}
            onChange={({ target: { value } }) => {
              handleFieldChange("name", value);
            }}
          />
          <TextField
            label="Описание"
            sx={{ marginBottom: 1 }}
            value={module.description}
            onChange={({ target: { value } }) => {
              handleFieldChange("description", value);
            }}
          />
          <TextField
            label="Необходимо вопросов"
            sx={{ marginBottom: 1 }}
            value={module.min_questions}
            onChange={({ target: { value } }) => {
              handleFieldChange("min_questions", +value);
            }}
          />
          <TextField
            label="Вопросов в квизе"
            value={module.quiz_question_amount}
            onChange={({ target: { value } }) => {
              handleFieldChange("quiz_question_amount", +value);
            }}
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
