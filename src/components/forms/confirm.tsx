import {
  Dialog,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

interface ConfirmProps {
  open: boolean;
  handleClose: () => void;
}

export const Confirm: React.FC<ConfirmProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open}>
      <form onSubmit={() => {}}>
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
