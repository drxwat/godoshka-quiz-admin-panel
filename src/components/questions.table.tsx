import { Box, Grid } from "@mui/material";
import { useParams } from "react-router";
import { Loader } from "./elements/loader";

import questionService from "../api/services/question.service";
import { QuestionCard } from "./question.card";
import { QueryKeys } from "../helpers/types";
import { AddBtn } from "./elements/addBtn";
import { useState } from "react";
import { QuestionWithAnswers } from "../core/client/types";
import { AddUpdateQuestion } from "./forms/add.update.question";
import { useQuery } from "@tanstack/react-query";

interface IQuestionFormState {
  open: boolean;
  data?: QuestionWithAnswers;
}

const QuestionsTable = () => {
  const { moduleId } = useParams();

  const { data: questions } = useQuery({
    queryKey: [QueryKeys.questions, moduleId],
    queryFn: () => questionService.getAllQuestionsWithAnswers(+moduleId!),
  });

  const [show, setShow] = useState<IQuestionFormState>({
    open: false,
  });

  const handleOpen = () => {
    setShow({
      open: true,
    });
  };

  if (!questions) {
    return <Loader />;
  }

  return (
    <Box>
      <Grid container spacing={2} direction="row" justifyContent="space-evenly">
        {questions?.map((question) => (
          <Grid item xs={12} sm={9} md={7} lg={5} key={question.id}>
            <QuestionCard
              question={question}
              onEdit={() =>
                setShow({
                  open: true,
                  data: question,
                })
              }
            />
          </Grid>
        ))}
      </Grid>
      <AddBtn handleOpen={handleOpen} />
      <AddUpdateQuestion
        open={show.open}
        handleClose={() => setShow({ open: false })}
        question={show.data}
      />
    </Box>
  );
};

export default QuestionsTable;
