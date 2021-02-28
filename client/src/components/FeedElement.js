import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Grid } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({
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
        flexDirection: 'row-reverse'
    }
  });

const FeedElement = (props) => {
    const [choiceButtonsState, setChoiceButtonsState] = useState({agree: 'outlined', disagree: 'outlined'});
    const classes = useStyles();

    const handleChoice = (e, choice) => {
        if (choice === 'agree'){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected
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
                //initial state: disagree was selected
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            };
        };
    };

    return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.username} - {moment(props.createdAt).format('Do MMM YY')}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        {props.questionTitle}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {props.questionBody}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.numArguments} arguments <br/>
                        {props.agreeRate *100}% agree {props.disagreeRate *100}% disagree
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button 
                            component={Link} 
                            to={{pathname: '/post/' + props.questionId,
                                state: {
                                    username: props.username,
                                    createdAt: props.createdAt,
                                    questionTitle: props.questionTitle,
                                    questionBody: props.questionBody,
                                    numArguments: props.numArguments,
                                    agreeRate: props.agreeRate,
                                    disagreeRate: props.disagreeRate,
                                    agreeOptionId: props.agree_option_id,
                                    disagreeOptionId: props.disagree_option_id
                                }}
                            } 
                            color="primary" variant="outlined" size="small">Read More</Button>
                        </Grid>
                        <Grid item xs={6} className={classes.choiceButtons}>
                            <ButtonGroup color="primary" size="small" fullWidth aria-label="outlined secondary button group">
                                <Button variant={choiceButtonsState.agree} onClick={(e) => handleChoice(e, 'agree')}>Agree</Button>
                                <Button variant={choiceButtonsState.disagree} onClick={(e) => handleChoice(e, 'disagree')}>Disagree</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
    )
};



export default FeedElement;