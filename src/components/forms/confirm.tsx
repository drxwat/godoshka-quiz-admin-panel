import {
  Dialog,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useDeleteQuestion } from "../../hooks/useDeleteQuestion";

interface ConfirmProps {
  open: boolean;
  handleClose: () => void;
  questionId: number;
}

export const Confirm: React.FC<ConfirmProps> = ({
  open,
  handleClose,
  questionId,
}) => {
  const { handleDelete } = useDeleteQuestion();
  return (
    <Dialog open={open}>
      <form
        onSubmit={async () => {
          await handleDelete(questionId);
          handleClose();
        }}
      >
        <Box sx={{ padding: 3 }}>
          <DialogContentText sx={{ textAlign: "center", marginBottom: 2 }}>
            Вы уверены?
          </DialogContentText>
          <DialogActions>
            <Button type="submit">Да</Button>
            <Button onClick={handleClose}>Переобуться</Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
};
