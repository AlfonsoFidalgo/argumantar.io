import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Typography, Button, Avatar, Container } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
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
    const [titleState, setTitleState] = useState();
    const [bodyState, setBodyState] = useState();
    // const history = useHistory();

    const postHandler = (e) => {
        e.preventDefault();
        // const data = {
        //     title: titleState.trim(),
        //     body: bodyState.trim()
        // };
        props.newPost(titleState.trim(), bodyState.trim(), props.token);
        // const headers = {
        //     headers: {
        //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnl3bG9kQGdtYWlsLmNvbSIsInVzZXJJZCI6MTQsImlhdCI6MTYxMjU1MjIxMSwiZXhwIjoxNjEyNTU1ODExfQ.OwQtccPOewgUiFVg7Y0FE4zDvEZvvE6URMwHxOWS654'
        //     }
        // };
        // axios.post('http://localhost:3001/question/post', data, headers)
        // .then(response => {
        //     console.log(response.data);
        //     history.push('/');
        // })
        // .catch(err => {
        //     console.log(err.response.data);
        //     history.push('/login');
        // });
    };

    const titleHandler = (e) => {
        setTitleState(e.target.value);
    };

    const bodyHandler = (e) => {
        setBodyState(e.target.value);
    };

    const classes = useStyles();
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
                        value={bodyState}
                        onChange={bodyHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        newPost: (title, body, token) => dispatch(actions.postQuestion(title, body, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);