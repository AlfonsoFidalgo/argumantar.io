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
            const response = await axios.get('http://localhost:3001/question/15/arguments/get');
            setArgumentsState(response.data);
        }
        fetchData();
        console.log(argumentsState);
    }, []);

    const classes = useStyles();
    return (
        <React.Fragment>
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" component="h2">Agree arguments</Typography>
            </AccordionSummary>
            <AccordionDetails >
                
                <List>
                    <ListItem>
                        <ListItemText primary='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                         secondary={<ArgumentMeta username='fonsete' date='2 Feb 2021'/>} />
                    </ListItem>
                </List>

            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" component="h2">Disagree arguments</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography color="textSecondary">
                    This is a disagree argument
                </Typography>
            </AccordionDetails>
        </Accordion>
        </React.Fragment>
    )
};

export default Arguments;