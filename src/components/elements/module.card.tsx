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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moduleService from "../../api/services/module.service";

const dateHandler = (date: string) => {
  return parseISO(date);
};

export const ModuleCard: FC<{
  module: ModuleWithQuestions;
  onSelect: () => void;
  onEdit: () => void;
}> = ({ module, onSelect, onEdit }) => {
  const queryClient = useQueryClient();

  const { mutate: remove } = useMutation({
    mutationKey: ["modules"],
    mutationFn: (id: number) => moduleService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  const { mutate: published } = useMutation({
    mutationKey: ["modules"],
    mutationFn: (isPublished: boolean) =>
      moduleService.published(isPublished, module.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

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
            onChange={() => {
              published(!module.is_published);
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
            <Button
              variant="contained"
              color="error"
              onClick={() => remove(module.id)}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
