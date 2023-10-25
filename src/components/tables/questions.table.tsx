import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableBody,
  Box,
} from "@mui/material";
import { useQuestion } from "../../hooks/useQuestion";
import { useReducer } from "react";
import { AddUpdateQuestion } from "../forms/add.update.question";
import { Confirm } from "../forms/confirm";

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
const reducer = (state: StateType, action: ActionType) => {
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
};

export const QuestionsTable = () => {
  const { questions, refreshQuestion } = useQuestion();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Box>
      <Confirm
        open={state.formType === "delete"}
        handleClose={() => dispatch({ type: CLOSE_FORM })}
      />
      {(state.formType === "update" || state.formType === "add") && (
        <AddUpdateQuestion
          formLabel={
            state.formType === "update"
              ? "Редкатировать вопрос"
              : "Добавить вопрос"
          }
          questionId={state.questionId}
          close={() => {
            dispatch({ type: CLOSE_FORM });
          }}
          refreshQuestion={refreshQuestion}
        />
      )}
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
                onClick={() => dispatch({ type: OPEN_ADD_QUESTION })}
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
                    onClick={() => {
                      dispatch({
                        type: OPEN_UPDATE_QUESTION,
                        questionId: question.id,
                      });
                    }}
                  >
                    Изменить
                  </Button>
                  <Button
                    sx={{
                      width: "33%",
                    }}
                    onClick={() => {
                      dispatch({
                        type: OPEN_DELETE_QUESTION,
                        questionId: question.id,
                      });
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
    </Box>
  );
};
