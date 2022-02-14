import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Login from "./Login";
import Typography from '@material-ui/core/Typography';
import './styles/Start.css';

export default function StartDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
    
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className = "modal">
        <Box display="flex" justifyContent="center" alignItems="center">
        <Button id = "bttn_id" variant="contained" color="primary" onClick={handleClickOpen}>
          START
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <div id="dialog-size">
            <DialogContent>
            <DialogTitle disableTypography><Typography variant="h3" align="center">Tic Tac Toe</Typography></DialogTitle>
              <Login onClick={handleClose}></Login>
            </DialogContent>
          </div>
        </Dialog>
        </Box>
    </div>
  );
}
