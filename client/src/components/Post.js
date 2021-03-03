import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Grid, TextField } from '@material-ui/core';
import moment from 'moment';
import Arguments from './Arguments';
import Spinner from './Spinner';
import * as actions from '../store/actions';


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
    const [argumentState, setArgumentState] = useState();
    const [choiceButtonsState, setChoiceButtonsState] = useState({agree: 'outlined', disagree: 'outlined'});

    useEffect(() => {
        props.onQuestionLoad(props.match.params.id);
        props.loadArguments(props.match.params.id);
    }, []);

    useEffect(() => {
        if (props.choices && props.activeQuestion && !props.choicesLoading){
            const userChoices = props.choices.map(choice => choice.option_id);
            if (userChoices.includes(props.activeQuestion[0].agree_option_id)){
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            } else if (userChoices.includes(props.activeQuestion[0].disagree_option_id)){
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            }
        }
    }, [props.activeQuestion, props.choices, props.choicesLoading])

    const postArgument = () => {
        //5 is the hardcoded optionId
        props.postArgument(5, argumentState, props.token, props.match.params.id);
    };

    const classes = useStyles();

    const handleArgument = (e) => {
        setArgumentState(e.target.value);
    };

    const handleChoice = (e, choice) => {
        const agreeOptionId = props.activeQuestion[0].agree_option_id;
        const disagreeOptionId = props.activeQuestion[0].disagree_option_id;
        if (choice === 'agree' && props.token){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                props.optionChosen(agreeOptionId, props.token);
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected, so we need to unselect it (delete choice)
                props.optionDelete(agreeOptionId, props.token);
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected, so we need to remove the disagree and add agree
                //NOT WORKING PROPERLY I think I need a specific action to mind changers due to async comms
 
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
            }
        } else if (choice === 'disagree' && props.token){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                props.optionChosen(disagreeOptionId, props.token);
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected, we need to remove agree and add disagree
                //NOT WORKING PROPERLY I think I need a specific action to mind changers due to async comms
                
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected, remove disagree
                props.optionDelete(disagreeOptionId, props.token);
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
            };
        };
    };

    let activeQuestion = (<Grid container spacing={2}><Spinner /></Grid>);

    if (props.activeQuestion){
        const agreeVotes = parseInt(props.activeQuestion[0].agree_votes);
        const disagreeVotes = parseInt(props.activeQuestion[0].disagree_votes);
        const agreeRate = (agreeVotes + disagreeVotes) > 0 ? (agreeVotes / (agreeVotes + disagreeVotes)) : 0;
        const disagreeRate = (agreeVotes + disagreeVotes) > 0 ? (disagreeVotes / (agreeVotes + disagreeVotes)) : 0
        activeQuestion = (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.activeQuestion[0].username} - {moment(props.activeQuestion[0].created_at).format('Do MMM YY')}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        {props.activeQuestion[0].question_title}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {props.activeQuestion[0].question_body}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.activeQuestion[0].num_arguments} arguments <br/>
                        {agreeRate * 100}% agree {disagreeRate * 100}% disagree
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
                                <Button variant={choiceButtonsState.agree} onClick={(e) => handleChoice(e, 'agree', props.activeQuestion[0].agree_option_id)}>Agree</Button>
                                <Button variant={choiceButtonsState.disagree} onClick={(e) => handleChoice(e, 'disagree', props.activeQuestion[0].disagree_option_id)}>Disagree</Button>
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
                            <Button color="primary" variant="contained" fullWidth onClick={postArgument}>Send</Button>
                        </Grid>
                    </Grid>
                </CardActions>

                <Arguments questionId={props.match.params.id}/>
            </Card>
        );
    };
    
    return (activeQuestion)
};

const mapStateToProps = state => {
    return {
        activeQuestion: state.questions.activeQuestion,
        arguments: state.arguments.arguments,
        token: state.auth.token,
        choices: state.choices.choices,
        choicesLoading: state.choices.loading,
        choicesError: state.choices.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onQuestionLoad: (questionId) => dispatch(actions.fetchQuestion(questionId)),
        loadArguments: (questionId) => dispatch(actions.fetchArguments(questionId)),
        postArgument: (optionId, body, token, questionId) => dispatch(actions.postArgument(optionId, body, token, questionId)),
        optionChosen: (optionId, token) => dispatch(actions.postChoice(optionId, token)),
        optionDelete: (optionId, token) => dispatch(actions.deleteChoice(optionId, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
