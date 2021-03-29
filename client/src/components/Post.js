import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Grid, TextField, InputAdornment } from '@material-ui/core';
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
    const [argumentState, setArgumentState] = useState('');
    const [argumentError, setArgumentError] = useState(false);
    const [choiceButtonsState, setChoiceButtonsState] = useState({agree: 'outlined', disagree: 'outlined'});
    const [chosenOptionId, setChosenOptionIdState] = useState();
    const [canPostArgument, setCanPostArgument] = useState(false);

    useEffect(() => {
        props.onQuestionLoad(props.match.params.id, props.token);
        props.loadArguments(props.match.params.id);
    }, []);

    useEffect(() => {
        if (argumentState.length > 1000){
            setArgumentError(true);
        } else {
            setArgumentError(false);
        }
    }, [argumentState])

    useEffect(() => {
        if (props.choices && props.activeQuestion && !props.choicesLoading){
            const userChoices = props.choices.map(choice => choice.option_id);
            if (userChoices.includes(props.activeQuestion[0].agree_option_id)){
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
                setChosenOptionIdState(props.activeQuestion[0].agree_option_id);
                setCanPostArgument(true);
            } else if (userChoices.includes(props.activeQuestion[0].disagree_option_id)){
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
                setChosenOptionIdState(props.activeQuestion[0].disagree_option_id);
                setCanPostArgument(true);
            }
        }
    }, [props.activeQuestion, props.choices, props.choicesLoading, chosenOptionId])

    const postArgument = () => {
        if (chosenOptionId){
            props.postArgument(chosenOptionId, argumentState, props.token, props.match.params.id);
            setArgumentState('');
        }
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
                props.updateQuestion([{...props.activeQuestion[0], agree_votes: parseInt(props.activeQuestion[0].agree_votes) + 1}]);
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
                setChosenOptionIdState(agreeOptionId);
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected, so we need to unselect it (delete choice)
                props.optionDelete(agreeOptionId, props.token);
                props.updateQuestion([{...props.activeQuestion[0], agree_votes: parseInt(props.activeQuestion[0].agree_votes) - 1}]);
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
                setChosenOptionIdState(null);
                setCanPostArgument(false);
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected, so we need to remove the disagree and add agree
                props.optionChange(disagreeOptionId, agreeOptionId, props.token);
                props.updateQuestion([{...props.activeQuestion[0], 
                    agree_votes: parseInt(props.activeQuestion[0].agree_votes) + 1, 
                    disagree_votes: parseInt(props.activeQuestion[0].disagree_votes) - 1}]);
                setChoiceButtonsState({agree: 'contained', disagree: 'outlined'});
                setChosenOptionIdState(agreeOptionId);
            }
        } else if (choice === 'disagree' && props.token){
            if (choiceButtonsState.agree === 'outlined' && choiceButtonsState.disagree === 'outlined'){
                //initial state: no choice made (both outlined)
                props.optionChosen(disagreeOptionId, props.token);
                props.updateQuestion([{...props.activeQuestion[0], disagree_votes: parseInt(props.activeQuestion[0].disagree_votes) + 1}]);
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
                setChosenOptionIdState(disagreeOptionId);
            } else if (choiceButtonsState.agree === 'contained' &&  choiceButtonsState.disagree === 'outlined'){
                //initial state: agree was selected, we need to remove agree and add disagree
                props.optionChange(agreeOptionId, disagreeOptionId, props.token);
                props.updateQuestion([{...props.activeQuestion[0], 
                    agree_votes: parseInt(props.activeQuestion[0].agree_votes) - 1, 
                    disagree_votes: parseInt(props.activeQuestion[0].disagree_votes) + 1}]);
                setChoiceButtonsState({agree: 'outlined', disagree: 'contained'});
                setChosenOptionIdState(disagreeOptionId);
            } else if (choiceButtonsState.agree === 'outlined' &&  choiceButtonsState.disagree === 'contained'){
                //initial state: disagree was selected, remove disagree
                props.optionDelete(disagreeOptionId, props.token);
                props.updateQuestion([{...props.activeQuestion[0], disagree_votes: parseInt(props.activeQuestion[0].disagree_votes) - 1}]);
                setChoiceButtonsState({agree: 'outlined', disagree: 'outlined'});
                setChosenOptionIdState(null);
                setCanPostArgument(false);
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
                        {props.activeQuestion[0].username} - {moment(props.activeQuestion[0].created_at).format('Do MMM YY h:mm a')}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        {props.activeQuestion[0].question_title}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {props.activeQuestion[0].question_body}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.activeQuestion[0].num_arguments} arguments <br/>
                        {(agreeRate * 100).toFixed(2)}% agree {(disagreeRate * 100).toFixed(2)}% disagree
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
                                <Button variant={choiceButtonsState.agree} disabled={props.token === null} onClick={(e) => handleChoice(e, 'agree', props.activeQuestion[0].agree_option_id)}>Agree</Button>
                                <Button variant={choiceButtonsState.disagree} disabled={props.token === null} onClick={(e) => handleChoice(e, 'disagree', props.activeQuestion[0].disagree_option_id)}>Disagree</Button>
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
                            error={argumentError}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Typography variant="caption">
                                    {argumentState ? argumentState.length : 0}/1000 </Typography>
                                    </InputAdornment>
                            }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" variant="contained" fullWidth disabled={!canPostArgument || argumentError} onClick={postArgument}>Send</Button>
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
        onQuestionLoad: (questionId, token) => dispatch(actions.fetchQuestion(questionId, token)),
        updateQuestion: (question) => dispatch(actions.setQuestion(question)),
        loadArguments: (questionId) => dispatch(actions.fetchArguments(questionId)),
        postArgument: (optionId, body, token, questionId) => dispatch(actions.postArgument(optionId, body, token, questionId)),
        optionChosen: (optionId, token) => dispatch(actions.postChoice(optionId, token)),
        optionDelete: (optionId, token) => dispatch(actions.deleteChoice(optionId, token)),
        optionChange: (oldOptionId, newOptionId, token) => dispatch(actions.changeChoice(oldOptionId, newOptionId, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
