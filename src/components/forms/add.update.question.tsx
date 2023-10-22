import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  DialogContentText,
  Box,
} from "@mui/material";
import { useAddQuestion } from "../../hooks/useAddQuestion";

interface AddUpdateQuestionProps {
  formLabel: string;
  open: boolean;
  questionId?: number;
  close: () => void;
  refreshQuestion: () => void;
}

export const AddUpdateQuestion: React.FC<AddUpdateQuestionProps> = ({
  open,
  questionId,
  formLabel,
  close,
  refreshQuestion,
}) => {
  const { question, hanldeSave, handleFieldChange } =
    useAddQuestion(questionId);

  return (
    <Dialog open={open}>
      <form
        onSubmit={async () => {
          await hanldeSave();
          close();
          refreshQuestion();
        }}
      >
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", marginBottom: 1 }}>
            {formLabel}
          </DialogContentText>
          <TextField
            value={question.text}
            label="Текст вопроса"
            fullWidth
            onChange={(event) => {
              handleFieldChange("text", event.target.value);
            }}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            value={question.time_to_answer}
            label="Время на ответ"
            defaultValue={20}
            onChange={(event) => {
              handleFieldChange("time_to_answer", +event.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Варианты ответов:
        </DialogContentText>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {question.answers.map((answer, index) => (
            <Box key={index} sx={{ width: "50%" }}>
              <DialogContent>
                <TextField
                  label={`Ответ ${index + 1}`}
                  fullWidth
                  value={answer.text}
                  onChange={(event) => {
                    const answers = [...question.answers];
                    answers[index] = {
                      ...answers[index],
                      text: event.target.value,
                    };

                    handleFieldChange("answers", answers);
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      value={!!answer.is_correct}
                      onChange={(event) => {
                        const answers = [...question.answers];
                        answers[index] = {
                          ...answers[index],
                          is_correct: !!event.target.checked,
                        };

                        handleFieldChange("answers", answers);
                      }}
                    />
                  }
                  label="Верный ответ"
                />
              </DialogContent>
            </Box>
          ))}
        </Box>

        <DialogActions>
          <Button color="primary" onClick={close}>
            Отмена
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={question.text.length < 3}
          >
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
