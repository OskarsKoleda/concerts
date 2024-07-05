import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type LockConfirmDialogProps = {
  setShow: (value: boolean) => void;
  show: boolean;
  title: string;
  description: string;
};

export const CustomDialog: React.FC<LockConfirmDialogProps> = ({
  show,
  setShow,
  title,
  description,
}) => {
  return (
    <Dialog open={show}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="outlined" >Delete</Button>
        <Button variant="contained" onClick={() => setShow(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
