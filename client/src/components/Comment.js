import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';


const Comment = (props) => {
    const username = props.username;
    const date = props.date;
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