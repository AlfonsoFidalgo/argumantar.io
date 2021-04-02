import React from 'react';
import ArgumentMeta from './ArgumentMeta';
import { ListItem, ListItemText, Avatar, ListItemAvatar } from '@material-ui/core';


const Argument = (props) => {
    return (
        <ListItem key={props.argument_id} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>{props.argument_username[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={props.argument_body}
                secondary={<ArgumentMeta username={props.argument_username} date={props.argument_date} 
                            upvotes={props.upvotes} downvotes={props.downvotes} userVote={props.userVote} 
                            argumentId={props.argument_id} argumentType={props.argumentType} />} />
        </ListItem>
    );
}

export default Argument;