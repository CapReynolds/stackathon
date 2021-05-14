import React, { useState, useEffect, Fragment} from "react";
import PersonIcon from '@material-ui/icons/Person';
import {StyledTableCell, StyledTableRow, StyledTableRow2} from './utils/styledTableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Message = ({message: {user, text}, name}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name !== undefined ? name.trim().toLowerCase() : 'bob';

    if(user === trimmedName){
        isSentByCurrentUser = true;
    }

    // useEffect(() => {
    //     if (scrollRef.current) {
    //       scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    //     }
    //   }, [message]);

    let date = new Date();
    let time = date.getHours() > 12 ? (date.getHours() - 12)+ ":" + date.getMinutes() + " PM" : date.getHours()+ ":" + date.getMinutes() + "AM";


    return (
        isSentByCurrentUser ?
        (
            //make it blue
            <StyledTableRow>
                <StyledTableCell rowSpan={3} colSpan={1}>
                    <PersonIcon />
                </StyledTableCell>
                <StyledTableCell colSpan={3}>
               {trimmedName}
            {text}
                {time}
                </StyledTableCell>
            </StyledTableRow>
        )
        :
        (
            //make it sent by someone else
            <StyledTableRow>
                <StyledTableCell rowSpan={3} colSpan={1} rowSpan={3}>
                    <PersonIcon />
                </StyledTableCell>
                <StyledTableCell>
                {user}
            {text}
                {time}
                </StyledTableCell>
            </StyledTableRow>
        )
    );
    // return (
    //     isSentByCurrentUser ?
    //     (
    //         //make it blue
    //         <div className="messageContainer justifyEnd">
    //             <AccountCircleIcon />
    //             <p className="sentText pr-10">{trimmedName}</p>
    //             <small>{time}</small>
    //             <div>
    //                 <p className="messageText colorWhite"> {text}</p>
    //             </div>
    //         </div>
    //     )
    //     :
    //     (
    //         //make it sent by someone else
    //         <div className="messageContainer justifyStart">
    //             <div>
    //             <p className="messageText colorDark"> {text}</p>
    //             </div>
    //             <p className="sentText pr-10">{user}</p>
    //         </div>
    //     )
    // );
}

export default Message;