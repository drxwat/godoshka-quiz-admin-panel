import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModuleInsert } from "../../helpers/types";
import moduleService from "../../api/services/module.service";
import { useOptimisticAdd } from "../../hooks/useOptimisticAdd";

interface AddModulesFormProps {
  open: boolean;
  handleClose: () => void;
}

export const AddModulesForm: React.FC<AddModulesFormProps> = ({
  open,
  handleClose,
}) => {
  const { mutate: add } = useOptimisticAdd(moduleService.add, "modules");

  const { register, handleSubmit } = useForm<ModuleInsert>();

  const onSubmit: SubmitHandler<ModuleInsert> = (data) => {
    add(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("name")}
          />
          <TextField label="Описание" sx={{ marginBottom: 1 }} />
          <TextField
            label="Необходимо вопросов"
            sx={{ marginBottom: 1 }}
            {...register("min_questions")}
          />
          <TextField
            label="Вопросов в квизе"
            {...register("quiz_question_amount")}
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
