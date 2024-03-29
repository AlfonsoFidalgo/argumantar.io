import React from 'react';
import ArgumentMeta from './ArgumentMeta';
import { ListItem, ListItemText } from '@material-ui/core';


const Argument = (props) => {
    return (
        <ListItem key={props.argument_id} alignItems="flex-start">
            <ListItemText 
                primary={props.argument_body}
                secondary={<ArgumentMeta argumentUsername={props.argument_username} date={props.argument_date} 
                            upvotes={props.upvotes} downvotes={props.downvotes} comments={props.comments}
                            userVote={props.userVote} argumentId={props.argument_id} argumentType={props.argumentType} />} />
        </ListItem>
    );
}

export default Argument;