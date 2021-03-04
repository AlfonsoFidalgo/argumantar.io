import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import * as actions from '../store/actions';

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
    const classes = useStyles();

    const [choiceButtonsState, setChoiceButtonsState] = useState({agree: 'outlined', disagree: 'outlined'});
    const [chosenOptionId, setChosenOptionIdState] = useState();

    useEffect(() => {
        if (props.choices && props.agreeOptionId && props.disagreeOptionId && !props.choicesLoading){
            const userChoices = props.choices.map(choice => choice.option_id);
            if (userChoices.includes(props.agreeOptionId)){
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
                setChosenOptionIdState(props.agreeOptionId);
            } else if (userChoices.includes(props.disagreeOptionId)){
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
                setChosenOptionIdState(props.disagreeOptionId);
            }
        }
    }, [props.choices, props.agreeOptionId, props.disagreeOptionId, props.choicesLoading, props.token]);

    const handleChoice = (e, choice) => {
        if (choice === 'agree' && props.token){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                props.optionChosen(props.agreeOptionId, props.token);
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected
                props.optionDelete(props.agreeOptionId, props.token);
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected
                props.optionChange(props.disagreeOptionId, props.agreeOptionId, props.token);
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            }
        } else if (choice === 'disagree' && props.token){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                props.optionChosen(props.disagreeOptionId, props.token);
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected
                props.optionChange(props.agreeOptionId, props.disagreeOptionId, props.token);
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected
                props.optionDelete(props.disagreeOptionId, props.token);
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


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        choices: state.choices.choices,
        choicesLoading: state.choices.loading,
        choicesError: state.choices.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        optionChosen: (optionId, token) => dispatch(actions.postChoice(optionId, token)),
        optionDelete: (optionId, token) => dispatch(actions.deleteChoice(optionId, token)),
        optionChange: (oldOptionId, newOptionId, token) => dispatch(actions.changeChoice(oldOptionId, newOptionId, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedElement);