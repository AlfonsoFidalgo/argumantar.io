import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, ButtonGroup, IconButton, Divider, Button, TextField } from '@material-ui/core';
import { ThumbUp, ThumbDown, Comment, Reply } from '@material-ui/icons';
import moment from 'moment'
import * as actions from '../store/actions';

const useStyles = makeStyles(theme => ({
      choiceButtons: {
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: theme.spacing(1)
      },
      divider: {
          marginTop: theme.spacing(1)
      },
      commentBox: {
        marginBottom: theme.spacing(1)
    }
}));

const ArgumentMeta = (props) => {
    const [argumentVote, setArgumentVote] = useState({upvote: '', downvote: ''});
    const [numUpvotes, setNumUpvotes] = useState(0);
    const [numDownvotes, setNumDownvotes] = useState(0);
    const [canVoteArgument, setCanVoteArgument] = useState(false);
    const [showReplyField, setShowReplyField] = useState(false);

    useEffect(() => {
        setNumUpvotes(parseInt(props.upvotes));
        setNumDownvotes(parseInt(props.downvotes));
    }, [props.upvotes, props.downvotes]);

    useEffect(() => {
        if (props.token && props.activeQuestion && props.choices){
            const userChoices = props.choices.map(choice => choice.option_id);
            if (userChoices.includes(props.activeQuestion[0].agree_option_id)){
                //user has agreed
                if (props.argumentType === 'agree'){
                    setCanVoteArgument(true);
                } else {
                    setCanVoteArgument(false);
                }
            } else if (userChoices.includes(props.activeQuestion[0].disagree_option_id)){
                //user has disagreed
                if (props.argumentType === 'disagree'){
                    setCanVoteArgument(true);
                } else {
                    setCanVoteArgument(false);
                }
            } else {
                setCanVoteArgument(false);
            }
        }
    }, [props.token, props.activeQuestion, props.choices, props.argumentType]);

    useEffect(() => {
        if (props.userVote === 'upvote') {
            setArgumentVote({upvote: 'primary', downvote: ''});
        } else if (props.userVote === 'downvote') {
            setArgumentVote({downvote: 'primary', upvote: ''});
        }
    }, [props.userVote]);

    const classes = useStyles();
    
    const handleVote = (e, vote) => {
        if (vote === 'upvote' && props.token){
            if (argumentVote.upvote === 'primary' && argumentVote.downvote === '') {
                //upvote was previously clicked, so we have to delete it
                props.removeVote(props.argumentId, props.token);
                setArgumentVote({upvote: '', downvote: ''});
                setNumUpvotes(numUpvotes - 1);
            } else if (argumentVote.upvote === '' && argumentVote.downvote === 'primary'){
                //downvote previously selected
                props.voteArgument(props.argumentId, props.token, vote);
                setArgumentVote({upvote: 'primary', downvote: ''});
                setNumUpvotes(numUpvotes + 1);
                setNumDownvotes(numDownvotes - 1);
            } else if (argumentVote.upvote === '' && argumentVote.downvote === ''){
                //no upvote or downvote yet
                props.voteArgument(props.argumentId, props.token, vote);
                setArgumentVote({upvote: 'primary', downvote: ''});
                setNumUpvotes(numUpvotes + 1);
            }
        } else if (vote === 'downvote' && props.token){
            if (argumentVote.upvote === 'primary' && argumentVote.downvote === '') {
                //upvote previously selected
                props.voteArgument(props.argumentId, props.token, vote);
                setArgumentVote({upvote: '', downvote: 'primary'});
                setNumUpvotes(numUpvotes - 1);
                setNumDownvotes(numDownvotes + 1);
            } else if (argumentVote.upvote === '' && argumentVote.downvote === 'primary'){
                //downvote was previously clicked, so we have to delete it
                props.removeVote(props.argumentId, props.token);
                setArgumentVote({upvote: '', downvote: ''});
                setNumDownvotes(numDownvotes - 1);
            } else if (argumentVote.upvote === '' && argumentVote.downvote === ''){
                //no upvote or downvote yet
                props.voteArgument(props.argumentId, props.token, vote);
                setArgumentVote({upvote: '', downvote: 'primary'});
                setNumDownvotes(numDownvotes + 1);
            }
        }
    }

    const replyField = (
        <Grid container>
            <Grid item xs={12} className={classes.commentBox}>
                <TextField fullWidth
                            variant="outlined"
                            label="Reply to this argument"/>
                
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" fullWidth disabled={!props.token} >Reply</Button>
            </Grid>
        </Grid>
    );

    const handleReply = (e) => {
        setShowReplyField(!showReplyField);
    }

    return(
        <React.Fragment>
        <Grid container>
            <Grid item xs={6}>
                <Typography color="textSecondary" variant="body2">{props.username} - {moment(props.date).format('Do MMM YY')}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.choiceButtons}>
                <ButtonGroup size="small" >
                    <IconButton><Comment fontSize='small' /> 3 </IconButton>
                    <IconButton onClick={(e) => handleVote(e, 'upvote')} disabled={!canVoteArgument}><ThumbUp fontSize='small' color={argumentVote.upvote} /> {numUpvotes} </IconButton>
                    <IconButton onClick={(e) => handleVote(e, 'downvote')} disabled={!canVoteArgument}><ThumbDown fontSize='small' color={argumentVote.downvote}/> {numDownvotes} </IconButton>
                </ButtonGroup>
                <Button color="primary" size="small" onClick={handleReply} disabled={!props.token}>
                    <IconButton > <Reply fontSize='default'/> </IconButton>
                </Button>
            </Grid>
            {showReplyField ? replyField : null}
        </Grid>
        <Divider className={classes.divider}/>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        votes: state.votes.votes,
        token: state.auth.token,
        choices: state.choices.choices,
        activeQuestion: state.questions.activeQuestion
    };
};

const mapDispatchToProps = dispatch => {
    return {
        voteArgument: (argumentId, token, voteType) => dispatch(actions.postVote(argumentId, token, voteType)),
        removeVote: (argumentId, token) => dispatch(actions.deleteVote(argumentId, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArgumentMeta)