import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, TextField, Typography, Button, Avatar, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
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


const Login = (props) => {
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');

    const cleanEmail = (eml) => {
        const [firtPart, secondPart] = eml.split('@');
        return firtPart.replaceAll('.','') + '@' + secondPart;
    };

    const loginHandler = (e) => {
        e.preventDefault();
        const data = {
            email: cleanEmail(emailState),
            password: passwordState
        }
        props.onAuth(data.email, data.password);
    };

    const emailHandler = (e) => {
        setEmailState(e.target.value);
    };

    const passwordHandler = (e) => {
        setPasswordState(e.target.value);
    };

    const classes = useStyles();

    let showErrorMessage = false;
    let errorText = null;
    if (props.error) {
        showErrorMessage = true
        errorText = 'Invalid email or password.'
    }

    let loginForm = (
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
                        value={emailState}
                        onChange={emailHandler}
                    />
                    <TextField
                        error={showErrorMessage}
                        helperText={errorText}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={passwordState}
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
    );

    if (props.loading) {
        loginForm = <Spinner />
    };

    if (props.token){
        return  <Redirect to='/' />
    };

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
                {loginForm}
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        choices: state.choices.choices,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);