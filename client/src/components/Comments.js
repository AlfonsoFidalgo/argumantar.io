import React from 'react';
import { List, Typography, ListItem, ListItemText } from '@material-ui/core';

const Comments = (props) => {
    
    return (
        <List>
            <ListItem>
                <ListItemText>
                    <Typography>This is a comment</Typography>
                </ListItemText>
            </ListItem>
        </List>
    )
}

export default Comments;