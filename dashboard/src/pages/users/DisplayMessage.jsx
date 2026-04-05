import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button
} from "@mui/material";

export default function DisplayMessage({ open, setOpen, message }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      // This prop prevents the focus conflict with the underlying page
      disableRestoreFocus
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Notification"}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}