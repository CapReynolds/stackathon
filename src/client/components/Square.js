import React from "react";
import Button from '@material-ui/core/Button';
import './styles/Square.css';

const Square = (props) => (
	<Button className="square" id={props.id} name ={props.name} data-clicked = {props.isClicked} onClick={props.onClick}></Button>
);

export default Square;