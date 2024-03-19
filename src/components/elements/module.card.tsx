import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import format from "date-fns/format";
import { FC } from "react";
import { ModuleWithQuestions } from "../../core/client/types";
import { parseISO } from "date-fns";
import moduleService from "../../api/services/module.service";
import { useOptimisticUpdate } from "../../hooks/useOptimisticUpdate";
import { useOptimisticRemove } from "../../hooks/useOptimisticRemove";

export const ModuleCard: FC<{
  module: ModuleWithQuestions;
  onSelect: () => void;
  onEdit: () => void;
}> = ({ module, onSelect, onEdit }) => {
  const { mutate: remove } = useOptimisticRemove(
    moduleService.remove,
    "modules",
  );
  const { mutate: published } = useOptimisticUpdate(
    moduleService.published,
    "modules",
  );
  const dateHandler = (date: string) => {
    return parseISO(date);
  };

  const questionCount = (module: ModuleWithQuestions) => {
    if (!module.questions || module.questions === undefined) return 0;
    return module.questions.length;
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            {module.name}
          </Typography>
          <Switch
            checked={module.is_published}
            disabled={questionCount(module) < module.min_questions}
            color={
              questionCount(module) >= module.min_questions
                ? "primary"
                : "error"
            }
            onChange={() => {
              console.log("before", module.is_published);
              published({ ...module, is_published: !module.is_published });
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {module.description ? module.description : "Описания нет"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span
            style={{
              color:
                questionCount(module) >= module.min_questions
                  ? "inherit"
                  : "red",
            }}
          >
            Необходимо вопросов: {module.min_questions}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Всего вопросов в модуле: {questionCount(module)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Вопросов в квизе: {module.quiz_question_amount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Добавлен:{" "}
          {module.created_at
            ? format(dateHandler(module.created_at), "dd:MM:yyyy HH:mm")
            : "Loading..."}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={onSelect}>
              Перейти
            </Button>
            <Button variant="contained" onClick={onEdit}>
              Изменить
            </Button>
          </Stack>
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                remove(module);
              }}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
