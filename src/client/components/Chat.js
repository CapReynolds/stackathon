import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Messages from './Messages'
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import {StyledTableCell} from './utils/styledTableCell';
//import { StyledTableCell } from './utils/styledTableCell';
//import {StyledTableCell, StyledTableRow} from './utils/styledTableCell';
import Message from './Message';
import './styles/Chat.css';

let socket;

const Chat = (props) => {
    
    //react hooks
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        socket = io();
        const {name, room} = props.user;

        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, ()=>{

        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[props]);

    //for messages
    useEffect(()=>{
        //adding message to messages array
        socket.on('message', (message)=>{
            console.log(message, 'in the message useeffect');
            setMessages([...messages, message]);
            console.log(messages);
        })
    },[messages]);

    // useEffect(() => {
    //     if (scrollRef.current) {
    //       scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    //     }
    //   }, [messages]);

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

    console.log(message, messages);
    return (
      <div>
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
                        onChange={(event)=> setMessage(event.target.value)} 
                        onKeyPress={event => event.key === "Enter" ? sendMessage(event) : console.log(event.key)}
                    />
                    <button onClick={(event) => sendMessage(event)}>Send</button>
                </StyledTableCell>
                
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    );
}
 
const mapStateToProps = (state) => state;
  
  export default connect(mapStateToProps, null)(Chat);
