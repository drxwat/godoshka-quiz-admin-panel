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
  TextareaAutosize,
  styled,
} from "@mui/material";
import { useAddQuestion } from "../../hooks/useAddQuestion";
import { QuestionWithAnswers } from "../../core/client/types";

interface AddUpdateQuestionProps {
  formLabel: string;
  questionId?: number;
  onClose: (reason: "close" | "submit") => void;
  onSubmit: (question: QuestionWithAnswers) => void;
}

export const AddUpdateQuestion: React.FC<AddUpdateQuestionProps> = ({
  questionId,
  formLabel,
  onClose,
  onSubmit,
}) => {
  const { question, hanldeSave, handleFieldChange, hanldeUpdate } =
    useAddQuestion(questionId);
  return (
    <Dialog open={!!formLabel}>
      <form
        onSubmit={async () => {
          onSubmit(question);
          if (formLabel === "Добавить вопрос") {
            await hanldeSave();
          } else {
            await hanldeUpdate();
          }
          onClose("submit");
        }}
      >
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", marginBottom: 1 }}>
            {formLabel}
          </DialogContentText>
          <TextareaAutosizeStyled
            minRows={10}
            value={question.text}
            onChange={(event) => {
              handleFieldChange("text", event.target.value);
            }}
          />
          <TextField
            value={question.time_to_answer}
            label="Время на ответ"
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
                      checked={!!answer.is_correct}
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
          <Button color="primary" onClick={() => onClose("close")}>
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

const TextareaAutosizeStyled = styled(TextareaAutosize)(() => ({
  width: "100%",
  padding: 0,
  borderRadius: "4px",
  marginBottom: "8px",
}));
