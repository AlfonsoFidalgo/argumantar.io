import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import moment from 'moment';

const Comment = (props) => {
    const username = props.username;
    const date = moment(props.date).format('Do MMM YY h:mm a');
    const secondary = `${username} - ${date}`;
    return (
        <ListItem key={props.commentId} alignItems="flex-start">
            <ListItemText 
                primary={props.commentBody}
                secondary={secondary} />
        </ListItem>
    );
}

export default Comment;