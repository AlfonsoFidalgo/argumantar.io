import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Button, Avatar, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

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


const Login = (props) => {
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');

    const loginHandler = (e) => {
        e.preventDefault();
        const data = {
            email: emailState,
            password: passwordState
        }
        axios.post('http://localhost:3001/user/login', data)
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
    };

    const emailHandler = (e) => {
        setEmailState(e.target.value);
    };

    const passwordHandler = (e) => {
        setPasswordState(e.target.value);
    };

    const classes = useStyles();

    return (
        (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Welcome Back!
                </Typography>
                <form className={classes.form} onSubmit={loginHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={emailHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={passwordHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Sign In
                    </Button>
                </form>
                <Grid container>
                    <Grid item xs>
                        <Typography variant="body2" color='primary'>
                            Forgot password?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" component={Link} className={classes.noDecoration} color='primary' to='/signup'>
                            Don't have an account? Sign Up
                        </Typography>
                    </Grid>
                </Grid>
                
            </div>
        </Container>
        )
    )
};

export default Login;