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

const dateHandler = (date: string) => {
  return parseISO(date);
};

export const ModuleCard: FC<{
  module: ModuleWithQuestions;
  onPublishedChanged: (isPublished: boolean) => void;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ module, onPublishedChanged, onSelect, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            {module.name}
          </Typography>
          <Switch
            checked={module.is_published}
            disabled={module.questions.length < module.min_questions}
            color={
              module.questions.length >= module.min_questions
                ? "primary"
                : "error"
            }
            onChange={async () => {
              onPublishedChanged(!module.is_published);
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
                module.questions.length >= module.min_questions
                  ? "inherit"
                  : "red",
            }}
          >
            Необходимо вопросов: {module.min_questions}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Всего вопросов в модуле: {module.questions.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Вопросов в квизе: {module.quiz_question_amount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created: {format(dateHandler(module.created_at), "dd:MM:yyyy HH:mm")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated: {format(dateHandler(module.updated_at), "dd:MM:yyyy HH:mm")}
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
            <Button variant="contained" color="error" onClick={onDelete}>
              Удалить
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
