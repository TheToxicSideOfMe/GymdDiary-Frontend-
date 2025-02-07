// components/DeletePopup.jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

function DeletePopup({ open, onClose, onConfirm, itemName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Split</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete "{itemName}"? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePopup;