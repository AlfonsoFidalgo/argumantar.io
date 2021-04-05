import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';


const Comment = (props) => {
    return (
        <ListItem key={props.commentId} alignItems="flex-start">
            <ListItemText 
                primary={props.commentBody}
                secondary={props.date} />
        </ListItem>
    );
}

export default Comment;