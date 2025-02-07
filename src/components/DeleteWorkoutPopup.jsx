import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from '@mui/material';
function DeleteWorkoutPopup({ open, onClose, onConfirm, itemName }) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Workout</DialogTitle>
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
  

export default DeleteWorkoutPopup;