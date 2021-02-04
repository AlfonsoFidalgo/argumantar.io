import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Grid, TextField } from '@material-ui/core';
import moment from 'moment';
import Arguments from './Arguments';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
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

const Post = (props) => {
    const [userState, setUserState] = useState();
    const [dateState, setDateState] = useState();
    const [titleState, setTitleState] = useState();
    const [bodyState, setBodyState] = useState();
    const [numArgsState, setNumArgsState] = useState();
    const [agreeRateState, setAgreeRateState] = useState();
    const [disagreeRateState, setDisagreeRateState] = useState(); 
    const [argumentState, setArgumentState] = useState();
    const [choiceButtonsState, setChoiceButtonsState] = useState({agree: 'outlined', disagree: 'outlined'});

    useEffect(() => {
        setUserState(props.location.state.user);
        setDateState(props.location.state.date);
        setTitleState(props.location.state.title);
        setBodyState(props.location.state.body);
        setNumArgsState(props.location.state.numArgs);
        setAgreeRateState(props.location.state.agreeRate);
        setDisagreeRateState(props.location.state.disagreeRate);
    }, [props]);

    const handleArgument = (e) => {
        setArgumentState(e.target.value);
    };

    const handleChoice = (e, choice) => {
        if (choice === 'agree'){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: agree was selected
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            }
        } else if (choice === 'disagree'){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: agree was selected
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            };
        };
    };

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {userState} - {moment(dateState).format('Do MMM YY')}
                </Typography>
                <Typography variant="h6" component="h2">
                    {titleState}
                </Typography>
                <Typography variant="body1" component="p">
                    {bodyState}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {numArgsState} people talking about this. <br/>
                    {agreeRateState * 100}% agree, {disagreeRateState * 100}% disagree.
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid item xs={6}>
                        <Button 
                        component={Link} 
                        to='/'
                        color="primary" variant="outlined" size="small">Back</Button>
                    </Grid>
                    <Grid item xs={6} className={classes.choiceButtons}>
                        <ButtonGroup color="primary" size="small" fullWidth aria-label="outlined secondary button group">
                            <Button variant={choiceButtonsState.agree} onClick={(e) => handleChoice(e, 'agree')}>Agree</Button>
                            <Button variant={choiceButtonsState.disagree} onClick={(e) => handleChoice(e, 'disagree')}>Disagree</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} className={classes.argumentBox}>
                        <TextField
                        id="standard-multiline-static"
                        label="Share your arguments"
                        multiline
                        fullWidth
                        variant="outlined"
                        rows={6}
                        onChange={handleArgument}
                        value={argumentState}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth>Send</Button>
                    </Grid>
                </Grid>
            </CardActions>

            <Arguments questionId={props.match.params.id}/>
        </Card>
    );
};

export default Post;
