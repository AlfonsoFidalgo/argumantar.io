import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';


const Comment = (props) => {
    return (
        <ListItem key={props.commentId} alignItems="flex-start">
            <ListItemText 
                primary='comment body goes here'
                secondary='username, date and other stuff' />
        </ListItem>
    );
}

export default Comment;