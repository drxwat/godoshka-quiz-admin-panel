import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Markdown from "react-markdown";
import { QuestionWithAnswers } from "../core/client/types";
import { QueryKeys } from "../helpers/types";
import questionService from "../api/services/question.service";
import { useOptimisticMutation } from "../hooks/useOptimisticMutation";
import optimisticActions from "../api/optimisticActions";

interface IQuestionCard {
  question: QuestionWithAnswers;
  onEdit: () => void;
}

export const QuestionCard: React.FC<IQuestionCard> = ({ question, onEdit }) => {
  const { mutate: remove } = useOptimisticMutation({
    mutationKey: QueryKeys.questions,
    updateFunc: questionService.remove,
    optimisticUpdateFn: optimisticActions.remove,
  });
  return (
    <Card
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Markdown>{question.text}</Markdown>
        </Box>
        <Grid container direction="row" justifyContent="space-evenly">
          {question.answers.map((answer) => {
            return (
              <Grid
                item
                key={answer.id}
                xs={12}
                sm={9}
                md={7}
                lg={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                  margin: 2,
                  borderRadius: "16px",
                  border: answer.is_correct
                    ? "1px solid #008cff"
                    : "1px solid #42a4f554",
                }}
              >
                <Typography>{answer.text}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onEdit}>
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              remove(question);
            }}
          >
            Удалить
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
