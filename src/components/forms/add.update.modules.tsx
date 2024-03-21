import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModuleInsert, QueryKeys } from "../../helpers/types";
import moduleService from "../../api/services/module.service";
import optimisticActions from "../../api/optimisticActions";
import { ModuleWithQuestions } from "../../core/client/types";
import { useOptimisticMutation } from "../../hooks/useOptimisticMutation";

interface AddModulesFormProps {
  open: boolean;
  handleClose: () => void;
  module?: ModuleWithQuestions;
}

export const AddModulesForm: React.FC<AddModulesFormProps> = ({
  open,
  handleClose,
  module,
}) => {
  const { mutate: add } = useOptimisticMutation({
    mutationKey: QueryKeys.modules,
    updateFunc: moduleService.add,
    optimisticUpdateFn: optimisticActions.add,
  });
  const { mutate: update } = useOptimisticMutation({
    mutationKey: QueryKeys.modules,
    updateFunc: moduleService.update,
    optimisticUpdateFn: optimisticActions.update,
  });

  const { register, handleSubmit, setValue, reset } = useForm<ModuleInsert>();

  if (module && module !== undefined) {
    setValue("name", module.name);
    setValue("description", module.description);
    setValue("min_questions", module.min_questions);
    setValue("quiz_question_amount", module.quiz_question_amount);
    setValue("id", module.id);
  }

  const onSubmit: SubmitHandler<ModuleInsert> = (data) => {
    if (data.id) {
      update(data);
      reset();
    } else {
      add(data);
      reset();
    }
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
          <TextField
            label="Описание"
            sx={{ marginBottom: 1 }}
            {...register("description")}
          />
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
              {module ? "Изменить" : "Добавить"}
            </Button>
            <Button
              onClick={() => {
                reset();
                handleClose();
              }}
              color="primary"
            >
              Отменить и закрыть
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};
