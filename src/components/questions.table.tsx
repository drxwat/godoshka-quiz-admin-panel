import { Box, Grid } from "@mui/material";
import { useParams } from "react-router";
import { useFetchData } from "../hooks/useFetchData";
import { Loader } from "./elements/loader";

import questionService from "../api/services/question.service";
import { QuestionCard } from "./question.card";

// type StateType = {
//   formType?: string | null;
//   questionId?: number | undefined;
//   isOpen?: boolean;
// };

// type ActionType = {
//   type: string;
//   questionId?: number | undefined;
//   formType?: string;
//   isOpen?: boolean;
// };

const QuestionsTable = () => {
  const { moduleId } = useParams();

  const { data: questions } = useFetchData("questions", () =>
    questionService.getAllQuestionsWithAnswers(+moduleId!),
  );

  console.log(questions);

  if (!questions) {
    return <Loader />;
  }

  return (
    <Box>
      <Grid container spacing={2} direction="row" justifyContent="space-evenly">
        {questions?.map((question) => (
          <Grid item xs={12} sm={9} md={7} lg={5} key={question.id}>
            <QuestionCard question={question} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuestionsTable;
