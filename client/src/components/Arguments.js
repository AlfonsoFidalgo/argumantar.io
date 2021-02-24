import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, Typography,
    Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Spinner from './Spinner';
import ArgumentMeta from './ArgumentMeta';


const Arguments = (props) => {
    let agreeArguments = (<Spinner />);
    let disagreeArguments = (<Spinner />);
    if (props.arguments) {
        const agreeRawArgs = props.arguments.filter((a) => a.option_body === 'Agree');
        const disAgreeRawArgs = props.arguments.filter((a) => a.option_body === 'Disagree');
        agreeArguments = agreeRawArgs.map(argument => {
            return (
                <ListItem key={argument.argument_id}>
                    <ListItemText primary={argument.argument_body}
                        secondary={<ArgumentMeta username={argument.argument_username} date={argument.argument_date}/>} />
                </ListItem>
            )   
        });
        if (agreeArguments.length === 0) {
            agreeArguments = <Typography color='textSecondary'>There are no arguments yet.</Typography>
        };
        disagreeArguments = disAgreeRawArgs.map(argument => {
            return (
                <ListItem key={argument.argument_id}>
                    <ListItemText primary={argument.argument_body}
                        secondary={<ArgumentMeta username={argument.argument_username} date={argument.argument_date}/>} />
                </ListItem>
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
        arguments: state.arguments.arguments
    };
};

export default connect(mapStateToProps)(Arguments);