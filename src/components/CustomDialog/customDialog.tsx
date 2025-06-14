import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { CustomDialogProps } from "./types";

export const CustomDialog = ({
  show,
  setShow,
  title,
  proceedButtonColor,
  content: description,
  onConfirm,
}: CustomDialogProps) => {
  return (
    <Dialog open={show}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={proceedButtonColor} variant="outlined" onClick={onConfirm}>
          Proceed
        </Button>
        <Button variant="contained" onClick={() => setShow(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
