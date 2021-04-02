import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, Typography,
    Accordion, AccordionSummary, AccordionDetails, Avatar, ListItemAvatar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Spinner from './Spinner';
import ArgumentMeta from './ArgumentMeta';
import Argument from './Argument';


const Arguments = (props) => {
    let agreeArguments = (<Spinner />);
    let disagreeArguments = (<Spinner />);
    if (props.arguments) {
        const agreeRawArgs = props.arguments.filter((a) => a.option_body === 'Agree');
        const disAgreeRawArgs = props.arguments.filter((a) => a.option_body === 'Disagree');
        agreeArguments = agreeRawArgs.map(argument => {
            let userVote = null;
            props.votes.forEach(vote => {
                if (vote.argument_id === argument.argument_id){
                    userVote = vote.v_type
                }
            });
            return (
                <Argument 
                    argument_id={argument.argument_id}
                    argument_username={argument.argument_username}
                    argument_body={argument.argument_body}
                    argument_date={argument.argument_date}
                    upvotes={argument.upvotes} 
                    downvotes={argument.downvotes} 
                    userVote={userVote}
                    argumentType='agree'
                />
            )   
        });
        if (agreeArguments.length === 0) {
            agreeArguments = <Typography color='textSecondary'>There are no arguments yet.</Typography>
        };
        disagreeArguments = disAgreeRawArgs.map(argument => {
            let userVote = null;
            props.votes.forEach(vote => {
                if (vote.argument_id === argument.argument_id){
                    userVote = vote.v_type
                }
            });
            return (
                <Argument 
                    argument_id={argument.argument_id}
                    argument_username={argument.argument_username}
                    argument_body={argument.argument_body}
                    argument_date={argument.argument_date}
                    upvotes={argument.upvotes} 
                    downvotes={argument.downvotes} 
                    userVote={userVote}
                    argumentType='disagree'
                />
            )   
        });
        if (disagreeArguments.length === 0) {
            disagreeArguments = <Typography color='textSecondary'>There are no arguments yet.</Typography>
        };
    };

    return (
        <React.Fragment>
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" component="h2">Agree arguments</Typography>
            </AccordionSummary>
            <AccordionDetails >
                <List> {agreeArguments} </List>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" component="h2">Disagree arguments</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List> {disagreeArguments} </List>
            </AccordionDetails>
        </Accordion>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        arguments: state.arguments.arguments,
        votes: state.votes.votes
    };
};

export default connect(mapStateToProps)(Arguments);