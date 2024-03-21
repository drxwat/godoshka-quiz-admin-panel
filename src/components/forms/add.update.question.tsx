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

  if (question && question !== undefined) {
    setValue("text", question.text || "");
    setValue("time_to_answer", question.time_to_answer || 10);
    setValue(
      `answers.${0}.is_correct`,
      question.answers[0]?.is_correct || false,
    );

    setValue(`answers.${0}.text`, question.answers[0]?.text || "");
    setValue(
      `answers.${1}.is_correct`,
      question.answers[1]?.is_correct || false,
    );
    setValue(`answers.${1}.text`, question.answers[1]?.text || "");
    setValue(
      `answers.${2}.is_correct`,
      question.answers[2]?.is_correct || false,
    );
    setValue(`answers.${2}.text`, question.answers[2]?.text || "");
    setValue(
      `answers.${3}.is_correct`,
      question.answers[3]?.is_correct || false,
    );
    setValue(`answers.${3}.text`, question.answers[3]?.text || "");
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
            {"Добавить вопрос"}
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
          <BoxOptions>
            <TextField
              {...register(`answers.${0}.text`)}
              label="Ответ 1"
              margin="dense"
            />
            <Checkbox {...register(`answers.${0}.is_correct`)} />
          </BoxOptions>
          <BoxOptions sx={{ width: "45%" }}>
            <Checkbox {...register(`answers.${1}.is_correct`)} />
            <TextField
              {...register(`answers.${1}.text`)}
              label="Ответ 2"
              margin="dense"
            />
          </BoxOptions>
          <BoxOptions sx={{ width: "45%" }}>
            <TextField
              {...register(`answers.${2}.text`)}
              label="Ответ 3"
              margin="dense"
            />
            <Checkbox {...register(`answers.${2}.is_correct`)} />
          </BoxOptions>
          <BoxOptions sx={{ width: "45%" }}>
            <Checkbox {...register(`answers.${3}.is_correct`)} />
            <TextField
              {...register(`answers.${3}.text`)}
              label="Ответ 4"
              margin="dense"
            />
          </BoxOptions>
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

const BoxOptions = styled(Box)(() => ({
  width: "45%",
  display: "flex",
  alignItems: "center",
}));
