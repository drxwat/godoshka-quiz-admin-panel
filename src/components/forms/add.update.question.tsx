import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
  TextareaAutosize,
  styled,
  Box,
  Checkbox,
} from "@mui/material";
import {
  QuestionUpdateWithAnswers,
  QuestionWithAnswers,
} from "../../core/client/types";
import { SubmitHandler, useForm } from "react-hook-form";
import questionService from "../../api/services/question.service";
import { QueryKeys } from "../../helpers/types";
import optimisticActions from "../../api/optimisticActions";
import { useParams } from "react-router";
import { useOptimisticMutation } from "../../hooks/useOptimisticMutation";

interface AddUpdateQuestionProps {
  open: boolean;
  handleClose: () => void;
  question?: QuestionWithAnswers;
}

export const AddUpdateQuestion: React.FC<AddUpdateQuestionProps> = ({
  open,
  handleClose,
  question,
}) => {
  const { moduleId } = useParams();

  const { mutate: add } = useOptimisticMutation({
    mutationKey: QueryKeys.questions,
    updateFunc: questionService.add,
    optimisticUpdateFn: optimisticActions.add,
  });
  const { mutate: update } = useOptimisticMutation({
    mutationKey: QueryKeys.questions,
    updateFunc: questionService.update,
    optimisticUpdateFn: optimisticActions.update,
  });

  const { register, handleSubmit, setValue, reset } =
    useForm<QuestionUpdateWithAnswers>();

  if (question) {
    setValue("text", question.text || "");
    setValue("time_to_answer", question.time_to_answer || 10);
    question.answers.forEach((answer, index) => {
      setValue(`answers.${index}.text`, answer.text || "");
      setValue(`answers.${index}.is_correct`, answer.is_correct || false);
    });
    setValue("module_id", question.module_id);
    setValue("id", question.id!);
  }

  const onSubmit: SubmitHandler<QuestionUpdateWithAnswers> = (data) => {
    if (data.module_id) {
      update(data);
      reset();
      handleClose();
    } else {
      const newData = {
        ...data,
        module_id: +moduleId!,
      };
      add(newData);
      reset();
      handleClose();
    }
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", marginBottom: 1 }}>
            {question ? "Изменить вопрос" : "Добавить вопрос"}
          </DialogContentText>
          <TextareaAutosizeStyled
            minRows={10}
            {...register("text", {
              required: true,
              minLength: {
                value: 5,
                message: "error message",
              },
            })}
          />
          <TextField
            {...register("time_to_answer")}
            label="Время на ответ"
            fullWidth
          />
        </DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Варианты ответов:
        </DialogContentText>
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: 4 }, (_, index) => (
            <BoxOptions key={index} index={index}>
              <TextField
                {...register(`answers.${index}.text`)}
                label={`Ответ ${index + 1}`}
                margin="dense"
              />
              <Checkbox
                {...register(`answers.${index}.is_correct`)}
                defaultChecked={question?.answers[index]?.is_correct || false}
              />
            </BoxOptions>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              reset();
              handleClose();
            }}
          >
            Отмена
          </Button>
          <Button color="primary" type="submit">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const TextareaAutosizeStyled = styled(TextareaAutosize)(() => ({
  width: "100%",
  padding: 0,
  borderRadius: "4px",
  marginBottom: "8px",
}));

const BoxOptions = styled(Box)(({ index }: { index: number }) => ({
  width: "45%",
  display: "flex",
  alignItems: "center",
  flexDirection: index % 2 === 1 ? "row-reverse" : "row",
}));
