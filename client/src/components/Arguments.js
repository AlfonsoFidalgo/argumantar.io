import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography,
    Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import ArgumentMeta from './ArgumentMeta';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        width: 'auto'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 0,
      },
      choiceButtons: {
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: theme.spacing(1)
      },
      argumentBox: {
          marginBottom: theme.spacing(1)
      }
}));


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
        disagreeArguments = disAgreeRawArgs.map(argument => {
            return (
                <ListItem key={argument.argument_id}>
                    <ListItemText primary={argument.argument_body}
                        secondary={<ArgumentMeta username={argument.argument_username} date={argument.argument_date}/>} />
                </ListItem>
            )   
        });
    };

    const classes = useStyles();
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