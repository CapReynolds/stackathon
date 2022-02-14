import React from "react";
import { connect } from 'react-redux';
import Square from './Square';
import './styles/Game.css';


const Game = (props) => {

  const toggleSquare = (ev) =>{   
    props.callSendMove(ev.target);
  }
    
  return (
    <div className="grid" id="game_board">
      <div className="grid-square"><Square id = {0} name = {0} value={0} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {1} name = {1} value={1} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {2} name = {2} value={2} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {3} name = {3} value={3} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {4} name = {4} value={4} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {5} name = {5} value={5} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {6} name = {6} value={6} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {7} name = {7} value={7} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
      <div className="grid-square"><Square id = {8} name = {8} value={8} isClicked= "false" onClick={(ev) => toggleSquare(ev)} /></div>
    </div>
  )
}
 
const mapStateToProps = (state) => state;
  
  export default connect(mapStateToProps, null)(Game);

