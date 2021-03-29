import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Typography, Button, Avatar, Container, InputAdornment } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    noDecoration: {
        textDecoration: 'none'
    }
  }));

const NewPost = (props) => {
    const [titleState, setTitleState] = useState('');
    const [bodyState, setBodyState] = useState('');
    const [postAllowed, setPostAllowed] = useState(true);
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);

    const postHandler = (e) => {
        e.preventDefault();
        props.newPost(titleState.trim(), bodyState.trim(), props.token);
    };

    useEffect(() => {
        if (titleState.length > 100){
            setPostAllowed(false);
            setTitleError(true);
        } else {
            // setPostAllowed(true);
            setTitleError(false);
        };

        if (bodyState.length > 500){
            setPostAllowed(false);
            setBodyError(true);
        } else {
            // setPostAllowed(true);
            setBodyError(false);
        };

        if (bodyState.length < 501 && titleState.length < 101 && !titleError && !bodyError){
            setPostAllowed(true);
        }
    }, [titleState, bodyState, postAllowed, bodyError, titleError]);

    const titleHandler = (e) => {
        setTitleState(e.target.value);
    };

    const bodyHandler = (e) => {
        setBodyState(e.target.value);
    };

    const classes = useStyles();

    if (props.postedQuestion){
        return  <Redirect to='/' />
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    New Post
                </Typography>
                <form className={classes.form} onSubmit={postHandler}>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        label="Post title"
                        name="title"
                        autoFocus
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Typography variant="caption">
                                {titleState ? titleState.length : 0}/100 </Typography>
                                </InputAdornment>
                        }}
                        error={titleError}
                        value={titleState}
                        onChange={titleHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={6}
                        name="body"
                        label="Write your post..."
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Typography variant="caption">
                                {bodyState ? bodyState.length : 0}/500 </Typography>
                                </InputAdornment>
                        }}
                        error={bodyError}
                        value={bodyState}
                        onChange={bodyHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={props.token === null || !postAllowed}
                    >
                    Publish
                    </Button>
                </form>
            </div>
        </Container>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.questions.loading,
        error: state.questions.error,
        token: state.auth.token,
        postedQuestion: state.questions.postedQuestion
    }
};

const mapDispatchToProps = dispatch => {
    return {
        newPost: (title, body, token) => dispatch(actions.postQuestion(title, body, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);