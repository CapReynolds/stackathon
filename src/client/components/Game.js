import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import Square from './Square';
import './styles/Game.css';

const Game = ({sendMove, setSquare, player, setMove}) => {
 
  const toggleSquare = (ev) =>{
    console.dir(ev.target);
    console.log(player);
    ev.target.style.fontSize = "x-large";
    ev.target.innerText = player;
    setMove(ev.target);
    sendMove(ev.target);
}

    return (
      <div className="grid">
        <div className="grid-square"><Square id = "1" name = "1" value="1" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "2" name = "2" value="2" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "3" name = "3" value="3" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "4" name = "4" value="4" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "5" name = "5" value="5" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "6" name = "6" value="6" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "7" name = "7" value="7" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "8" name = "8" value="8" onClick={(ev) => toggleSquare(ev)} /></div>
        <div className="grid-square"><Square id = "9" name = "9" value="9" onClick={(ev) => toggleSquare(ev)} /></div>
    </div>
    );
}
 
const mapStateToProps = (state) => state;
  
  export default connect(mapStateToProps, null)(Game);