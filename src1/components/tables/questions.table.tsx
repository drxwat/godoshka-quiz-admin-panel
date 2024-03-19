import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { useCallback, useReducer } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import { client } from "../../core/client/client";
import { useDeleteQuestion } from "../../hooks/useDeleteQuestion";
import { useFetchData } from "../../hooks/useFetchData";
import { AddUpdateQuestion } from "../forms/add.update.question";
import { Confirm } from "../forms/confirm";
import { Loader } from "../elements/loader";
import { QuestionUpdateWithAnswers } from "../../core/client/types";

const OPEN_ADD_QUESTION = "OPEN_ADD_QUESTION";
const OPEN_UPDATE_QUESTION = "OPEN_UPDATE_QUESTION";
const OPEN_DELETE_QUESTION = "OPEN_DELETE_QUESTION";
const CLOSE_FORM = "CLOSE_FORM";

const initialState = {
  formType: "",
  questionId: undefined,
  isOpen: false,
};

type StateType = {
  formType?: string | null;
  questionId?: number | undefined;
  isOpen?: boolean;
};

type ActionType = {
  type: string;
  questionId?: number | undefined;
  formType?: string;
  isOpen?: boolean;
};
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case OPEN_ADD_QUESTION:
      return {
        formType: "add",
        isOpen: true,
        questionId: undefined,
      };
    case OPEN_UPDATE_QUESTION:
      return {
        formType: "update",
        isOpen: true,
        questionId: action.questionId,
      };
    case OPEN_DELETE_QUESTION:
      return {
        formType: "delete",
        isOpen: true,
        questionId: action.questionId,
      };
    case CLOSE_FORM:
      return {
        formType: null,
        isOpen: false,
        questionId: undefined,
      };
    default:
      return state;
  }
}

const QuestionsTable = () => {
  const { moduleId } = useParams();

  const fetchQuestions = useCallback(
    async () =>
      await client
        .from("questions")
        .select("*, answers(*)")
        .eq("module_id", moduleId ?? -1)
        .order("created_at"),
    [moduleId],
  );

  const { handleDelete } = useDeleteQuestion();
  const { data: questions, refreshData: refreshQuestion } =
    useFetchData(fetchQuestions);
  const [state, dispatch] = useReducer(reducer, initialState);

  if (!questions) {
    return <Loader />;
  }

  return (
    <Box>
      <Confirm
        open={state.formType === "delete"}
        handleClose={() => dispatch({ type: CLOSE_FORM })}
        handleDelete={async () => {
          if (state.questionId) {
            await handleDelete(state.questionId);
            refreshQuestion();
          }
        }}
      />
      {(state.formType === "update" || state.formType === "add") && (
        <AddUpdateQuestion
          formLabel={
            state.formType === "update"
              ? "Редкатировать вопрос"
              : "Добавить вопрос"
          }
          questionId={state.questionId}
          onClose={(reason) => {
            if (reason === "submit") {
              refreshQuestion();
            }
            dispatch({ type: CLOSE_FORM });
          }}
          onSubmit={(question) => {
            if (question.id && question.created_at) {
              const fakeData = [...questions];
              const idx = questions.findIndex(({ id }) => id === question.id);
              fakeData.splice(idx, 1, question as QuestionUpdateWithAnswers);
              refreshQuestion({ fakeData, revalidate: false });
            }
            dispatch({ type: CLOSE_FORM });
          }}
        />
      )}
      <Fab
        color="primary"
        aria-label="Add Module"
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "48px",
        }}
        onClick={() => dispatch({ type: OPEN_ADD_QUESTION })}
      >
        <AddIcon />
      </Fab>
      {questions.map((question, index) => {
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <List
              sx={{
                display: "flex",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(28, 96, 119, 0.05)", // Легкая подсветка при наведении
                },
              }}
            >
              <ListItem
                sx={{
                  width: "60%",
                }}
              >
                <ListItemText>
                  <Markdown>{question.text}</Markdown>
                </ListItemText>
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  gap: 1,
                }}
              >
                {question.answers.map((answer) => {
                  return (
                    <ListItemText
                      sx={{
                        width: "34%",
                        textAlign: "center",
                        backgroundColor: answer.is_correct
                          ? "lightblue"
                          : "white",
                        borderRadius: "10px",
                        padding: 1,
                      }}
                    >
                      {answer.text}
                    </ListItemText>
                  );
                })}
              </ListItem>
              <ListItem>
                <ListItemSecondaryAction
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <IconButton
                    onClick={() => {
                      dispatch({
                        type: OPEN_UPDATE_QUESTION,
                        questionId: question.id,
                      });
                    }}
                    edge="end"
                    aria-label="Изменить"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      dispatch({
                        type: OPEN_DELETE_QUESTION,
                        questionId: question.id,
                      });
                    }}
                    edge="end"
                    aria-label="Удалить"
                    color="primary"
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {index < questions.length - 1 && <Divider />}
          </motion.div>
        );
      })}
    </Box>
  );
};

export default QuestionsTable;
