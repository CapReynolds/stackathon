import React from "react";
import PersonIcon from '@material-ui/icons/Person';
import {StyledTableCell, StyledTableRow, StyledTableRow2} from './utils/styledTableCell';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Message = ({message: {user, text}, name}) => {
    let isSentByCurrentUser = false;
    let isSentByAdmin = false;

    const trimmedName = name !== undefined ? name.trim().toLowerCase() : 'bob';

    if(user === trimmedName){
        isSentByCurrentUser = true;
    }
    if(user === 'admin') {
        isSentByAdmin = true;
    }

    let date = new Date();
    let hour = date.getHours() > 12 ? date.getHours() -12 : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    let ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    let time = hour+ ":" + minutes + ampm;


    return (
        isSentByCurrentUser ?
        (
            //current user
            <StyledTableRow>
                <StyledTableCell rowSpan={4} colSpan={1}>
                    <PersonIcon color="secondary" />
                </StyledTableCell>
                <StyledTableCell rowSpan={4}>
                <form>
                {trimmedName}:<br></br>
                {text}<br></br>
                </form>
                <small>{time}</small>
                </StyledTableCell>
            </StyledTableRow>
        )
        :
        (
            //make it sent by someone else
            isSentByAdmin ?
            (
                <StyledTableRow>
                <StyledTableCell rowSpan={3} colSpan={1} rowSpan={3}>
                    <NotificationsIcon color="secondary"/>
                </StyledTableCell>
                <StyledTableCell rowSpan={3}>
                <form>
                {text}<br></br>
                </form>
                <small>{time}</small>
                </StyledTableCell>
            </StyledTableRow>
            )
            :
            (
                <StyledTableRow>
                <StyledTableCell rowSpan={3} colSpan={1} rowSpan={3}>
                    <PersonIcon color="secondary"/>
                </StyledTableCell>
                <StyledTableCell rowSpan={3}>
                <form>
                {user}:<br></br>
                {text}<br></br>
                </form>
                <small>{time}</small>
                </StyledTableCell>
            </StyledTableRow>
            )
        )
    );
}

export default Message;