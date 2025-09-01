import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import type { ButtonOwnProps } from "@mui/material";

interface CustomDialogProps {
  show: boolean;
  title: string;
  content: string;
  proceedButtonColor: ButtonOwnProps["color"];
  setShow: (value: boolean) => void;
  onConfirm: () => void;
}

export const CustomDialog = ({
  show,
  setShow,
  title,
  proceedButtonColor,
  content,
  onConfirm,
}: CustomDialogProps) => {
  return (
    <Dialog open={show}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
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
