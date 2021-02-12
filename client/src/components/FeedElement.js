import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import * as actionTypes from '../store/actions';

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
                props.onAgree(props.questionId);
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected
                props.onRemoveAgree(props.questionId);
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected
                props.onRemoveDisagree(props.questionId);
                props.onAgree(props.questionId);
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            }
        } else if (choice === 'disagree'){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                props.onDisagree(props.questionId);
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected
                props.onRemoveAgree(props.questionId);
                props.onDisagree(props.questionId);
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected
                props.onRemoveDisagree(props.questionId);
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            };
        };
    };

    return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.user} - {moment(props.date).format('Do MMM YY')}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {props.body}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.arguments} people talking about this. <br/>
                        {props.agreeRate *100}% agree, {props.disagreeRate *100}% disagree.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button 
                            component={Link} 
                            to={{pathname: '/post/' + props.questionId,
                                state: {
                                    user: props.user,
                                    date: props.date,
                                    title: props.title,
                                    body: props.body,
                                    numArgs: props.arguments,
                                    agreeRate: props.agreeRate,
                                    disagreeRate: props.disagreeRate                                    
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

const mapStateToProps = (state) => {
    return {
        agreed: state.agreedQuestions,
        disagreed: state.disagreedQuestions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAgree: (questionId) => dispatch({type: actionTypes.AGREE, questionId: questionId}),
        onDisagree: (questionId) => dispatch({type: actionTypes.DISAGREE, questionId: questionId}),
        onRemoveAgree: (questionId) => dispatch({type: actionTypes.REMOVE_AGREE, questionId: questionId}),
        onRemoveDisagree: (questionId) => dispatch({type: actionTypes.REMOVE_DISAGREE, questionId: questionId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedElement);