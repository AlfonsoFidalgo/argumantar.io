import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, ButtonGroup, IconButton, Divider } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import moment from 'moment'
import * as actions from '../store/actions';

const useStyles = makeStyles(theme => ({
      choiceButtons: {
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: theme.spacing(1)
      }
}));

const ArgumentMeta = (props) => {
    const [argumentVote, setArgumentVote] = useState({upvote: '', downvote: ''});
    const [numUpvotes, setNumUpvotes] = useState(0);
    const [numDownvotes, setNumDownvotes] = useState(0);

    useEffect(() => {
        setNumUpvotes(parseInt(props.upvotes));
        setNumDownvotes(parseInt(props.downvotes));
    }, [props.upvotes, props.downvotes]);

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
                setArgumentVote({upvote: '', downvote: ''});
                setNumUpvotes(numUpvotes - 1);
            } else if (argumentVote.upvote === '' && argumentVote.downvote === 'primary'){
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
                setArgumentVote({upvote: '', downvote: 'primary'});
                setNumUpvotes(numUpvotes - 1);
                setNumDownvotes(numDownvotes + 1);
            } else if (argumentVote.upvote === '' && argumentVote.downvote === 'primary'){
                setArgumentVote({upvote: '', downvote: ''});
                setNumDownvotes(numDownvotes - 1);
            } else if (argumentVote.upvote === '' && argumentVote.downvote === ''){
                setArgumentVote({upvote: '', downvote: 'primary'});
                setNumDownvotes(numDownvotes + 1);
            }
        }
    }

    return(
        <React.Fragment>
        <Grid container>
            <Grid item xs={6}>
                <Typography color="textSecondary" variant="body2">{props.username} - {moment(props.date).format('Do MMM YY')}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.choiceButtons}>
                <ButtonGroup size="small" >
                    <IconButton onClick={(e) => handleVote(e, 'upvote')}><ThumbUp fontSize='small' color={argumentVote.upvote} /> {numUpvotes} </IconButton>
                    <IconButton onClick={(e) => handleVote(e, 'downvote')}><ThumbDown fontSize='small' color={argumentVote.downvote}/> {numDownvotes} </IconButton>
                </ButtonGroup>
            </Grid>
        </Grid>
        <Divider />
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        votes: state.votes.votes,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        voteArgument: (argumentId, token, voteType) => dispatch(actions.postVote(argumentId, token, voteType))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArgumentMeta)