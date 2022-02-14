import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import './styles/Start.css';

const PlayAgain = (props) => {
  const {gameGrid, ResetGrid} = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const restartBttn = () => {
    ResetGrid();
    setOpen(false);
  };

  useEffect(()=>{
    //setting player
    if(gameGrid.winner)
      setOpen(true);
  }, [gameGrid]);


  return (
    <div className = "modal2">
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ m: 0.5 }}>
         <Dialog open={open} onClose={handleClose} >
        <div id="dialog-size2">
          <DialogContent>
           <Box sx={{ color: 'text.primary', fontSize: 28, fontWeight: 'medium' }}>
            Play Again?
           </Box>
          </DialogContent>
          <div id="buttons">
          <Button id = "bttn_id2" variant="contained" color="secondary" onClick={restartBttn}>
            YES
          </Button>
          <Button id = "bttn_id2" variant="contained" color="secondary" onClick={handleClose}>
            NO
          </Button>
          </div>
        </div>
      </Dialog>
      </Box>
    </div>
  );
}

export default PlayAgain;
