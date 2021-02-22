import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography,
    Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import ArgumentMeta from './ArgumentMeta';


const Arguments = (props) => {
    const [argumentsState, setArgumentsState] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3001/question/${props.questionId}/arguments/get`);
            setArgumentsState(response.data);
        }
        fetchData();
    }, [props.questionId]);

    let agreeArguments, disagreeArguments;
    if (argumentsState) {
        const agreeRawArgs = argumentsState.data.filter((a) => a.option_body === 'Agree');
        const disAgreeRawArgs = argumentsState.data.filter((a) => a.option_body === 'Disagree');
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

export default Arguments;