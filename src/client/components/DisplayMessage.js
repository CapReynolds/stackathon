import React, { useState, useEffect } from "react";
import './styles/Start.css';

const DisplayMessage = (props) => {
    const {player, dis} = props;
   
    const [turn, setTurn] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('');

    useEffect(()=> {
        if(player.opponent != 0 && player.turn === true)
        {
            setTurn(true);
        }
        else {
            setDisplayMessage('Awaiting Opponent');
        }
    }, [])

    useEffect(() => {
        if(turn === true){
            setDisplayMessage('Your Turn');
            setTurn(true);
        }
        else if (turn === false) {
            if(player.opponent != 0){
                setDisplayMessage("Opponent's Turn");
                setTurn(false);
            }
            else
                setDisplayMessage("Awaiting Opponent");

            setTurn(false);
        }   
        
  }, [turn]);



  return (
    <div className = "displaymessage">
        <h1>{dis}</h1>
    </div>
  );
}

export default DisplayMessage;
