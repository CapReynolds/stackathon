import React from "react";
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import {StyledTableCell} from './utils/styledTableCell';
import Message from './Message';
import './styles/Chat.css';


let socket;

const Chat = (props) => {
    
    return (
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
                    {props.messages.map((message, id) => 
                        <TableBody key ={id}>
                            <Message message={message} name ={name}/>
                        </TableBody>
                    )}
                     <TableFooter ref={props.messagesEndRef} />
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
                        value={props.message} 
                        onChange={(ev)=> props.setMessage(ev.target.value)} 
                        onKeyPress={ev => ev.key === "Enter" ? props.sendMessage(ev) : null}
                    />
                    <button onClick={(ev) => props.sendMessage(ev)}>Send</button>
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
