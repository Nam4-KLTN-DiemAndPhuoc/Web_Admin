import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from '../../redux/dialogSlice';
import CloseIcon from '@mui/icons-material/Close';
export default function MyDialog({check, title, content}) {

  const dispatch= useDispatch()


  const handleClose = () => {
    dispatch(openDialog())
  };

  return (
    <div>
     
      <Dialog
        open={check}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
        {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Đóng <CloseIcon /> </Button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
