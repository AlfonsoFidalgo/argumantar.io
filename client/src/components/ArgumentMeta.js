import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, ButtonGroup, IconButton, Divider } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
      choiceButtons: {
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: theme.spacing(1)
      }
}));

const ArgumentMeta = (props) => {
    const [argumentVote, setArgumentVote] = useState({upvote: '', downvote: ''});

    useEffect(() => {
        if (props.userVote === 'upvote') {
            setArgumentVote({upvote: 'primary'});
        } else if (props.userVote === 'downvote') {
            setArgumentVote({downvote: 'primary'});
        }
    }, [props.userVote]);

    const classes = useStyles();
    
    const handleVote = (e, vote) => {
        if (argumentVote.upvote === 'primary' && vote === 'upvote'){
            //upvoted the argument and clicked upvote: remove upvote
            setArgumentVote({upvote: '', downvote: ''});
        } else if (argumentVote.upvote !== 'primary' && vote === 'upvote'){
            //didn't upvote the argument and wasnt colored: add upvote
            setArgumentVote({upvote: 'primary', downvote: ''});
        } else if (argumentVote.upvote === 'primary' && vote === 'downvote'){
            //upvote was selected and clicked downvote
            setArgumentVote({upvote: '', downvote: 'primary'});
        } else if (argumentVote.downvote !== 'primary' && vote === 'downvote'){
            //downvote was not selected and clicked downvote
            setArgumentVote({upvote: '', downvote: 'primary'});
        } else if (argumentVote.downvote === 'primary' && vote === 'downvote'){
            //downvote was preselected and clicked: remove downvote
            setArgumentVote({upvote: '', downvote: ''});
        }
    };

    return(
        <React.Fragment>
        <Grid container>
            <Grid item xs={6}>
                <Typography color="textSecondary" variant="body2">{props.username} - {moment(props.date).format('Do MMM YY')}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.choiceButtons}>
                <ButtonGroup size="small" >
                    <IconButton onClick={(e) => handleVote(e, 'upvote')}><ThumbUp fontSize='small' color={argumentVote.upvote} /> {props.upvotes} </IconButton>
                    <IconButton onClick={(e) => handleVote(e, 'downvote')}><ThumbDown fontSize='small' color={argumentVote.downvote}/> {props.downvotes} </IconButton>
                </ButtonGroup>
            </Grid>
        </Grid>
        <Divider />
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        votes: state.votes.votes
    };
};

export default connect(mapStateToProps)(ArgumentMeta)