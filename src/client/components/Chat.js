import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import {StyledTableCell} from './utils/styledTableCell';
//import { StyledTableCell } from './utils/styledTableCell';
//import {StyledTableCell, StyledTableRow} from './utils/styledTableCell';
import Message from './Message';
const {getUser} = require("../../server/users");
import './styles/Chat.css';

import Game from './Game';

let socket;

const Chat = (props) => {
    
    //react hooks
    const [name, setName] = useState('');
    const [room, setRoom] = useState(1);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [player, setPlayer] = useState('');
    const [move, setMove] = useState('');
    const [moves, setMoves] = useState([]);

    const [square, setSquare] = useState('');
    const [squares, setSquares] = useState([]);
    // const [playerMove, setPlayerMoves] = useState([]);

    //combine componentDidUpdate, componentDidMount
    useEffect(()=>{
        socket = io();
        const {name, room} = props.user;

        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, (user)=>{
            console.log('in the callback')
        });
        return ()=>{
            socket.emit('leave');
            socket.off();
        }
    },[props]);

    //for messages
    useEffect(()=>{
        //adding message to messages array
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
        })
    },[messages]);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
      }, [messages]);

    useEffect(()=>{
        //adding moves to move array
        socket.on('send move', (move)=>{
          setMoves([...moves, move]);
            console.log(move);
        })
    },[moves]);

    useEffect(()=>{
        //setting player
        socket.on('player', (user)=>{
          setPlayer(user.player);
        })
    },[squares]);

    // useEffect(()=>{
    //     //setting player
    //     socket.on('send move', (event)=>{
    //         setMoves([...moves, event]);
    //         console.log(event);
    //     })
    // },[moves]);

   //render() {
      //console.log(props, 'props');

    const sendMessage = (event) =>{
        //prevent default behavior on key press
        console.log(message, 'called');
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    const sendMove = (event) =>{
        //prevent default behavior on key press
        console.log(move);
    }

    //console.log(message, messages);
    return (
      <div className="app">
          <div className="chat">
        <TableContainer component={Paper} style={{ height: 600, width: 300}}>
            <Table aria-label='spanning table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center' colSpan={3}>
                            Chat
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                {/* <Messages messages={messages}/> */}
                    {messages.map((message, id) => 
                        <TableBody key ={id}>
                            <Message message={message} name ={name}/>
                        </TableBody>
                    )}
                     <TableFooter ref={messagesEndRef} />
            </Table>
        </TableContainer>
        <TableContainer component={Paper} style={{ width: 300}}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                <input 
                        type="text"
                        placeholder="Enter a message..."
                        value={message} 
                        onChange={(ev)=> setMessage(ev.target.value)} 
                        onKeyPress={ev => ev.key === "Enter" ? sendMessage(ev) : null}
                    />
                    <button onClick={(ev) => sendMessage(ev)}>Send</button>
                </StyledTableCell>
                
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      <div className = "game">
          <Game sendMove={sendMove} setSquare={setSquare} player={player} setMove = {setMove} />
      </div>
      </div>
    );
}
 
const mapStateToProps = (state) => state;
  
  export default connect(mapStateToProps, null)(Chat);
