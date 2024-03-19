import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import Markdown from "react-markdown";
import { QuestionWithAnswers } from "../core/client/types";

interface IQuestionCard {
  question: QuestionWithAnswers;
}

export const QuestionCard: React.FC<IQuestionCard> = ({ question }) => {
  return (
    <Card style={{ height: "100%" }}>
      <CardContent>
        <Box>
          <Markdown>{question.text}</Markdown>
        </Box>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
        >
          {question.answers.map((answer) => {
            return (
              <Grid item key={answer.id} xs={12} sm={9} md={7} lg={5}>
                {answer.text}
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Изменить</Button>
          <Button variant="contained" color="error" onClick={() => {}}>
            Удалить
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
