import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableBody,
} from "@mui/material";
import { useQuestion } from "../../hooks/useQuestion";

export const QuestionsTable = () => {
  const { questions } = useQuestion();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Module ID</TableCell>
          <TableCell>Question text</TableCell>
          <TableCell>Created date</TableCell>
          <TableCell>Updated date</TableCell>
          <TableCell
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                width: "50%",
              }}
            >
              Добавить вопрос
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {questions.map((question) => {
          return (
            <TableRow key={question.id}>
              <TableCell>{question.module_id}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>{question.created_at}</TableCell>
              <TableCell>{question.updated_at}</TableCell>
              <TableCell>
                <Button
                  sx={{
                    width: "50%",
                  }}
                >
                  Изменить
                </Button>
                <Button
                  sx={{
                    width: "33%",
                  }}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
