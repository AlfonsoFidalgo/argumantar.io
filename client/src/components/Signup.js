import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Avatar, Button, TextField, Grid, makeStyles, Container, Typography, InputAdornment} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  noDecoration: {
    textDecoration: 'none'
  }
}));

const Signup = (props) => {  
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [usernameState, setUsernameState] = useState('');
  const [displayNameState, setDisplayNameState] = useState('');
  const [confirmedPasswordState, setConfirmedPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('')
  const classes = useStyles();
  
  const usernameHandler = (e) => setUsernameState(e.target.value);
  const displaynameHandler = (e) => setDisplayNameState(e.target.value);
  const emailHandler = (e) => setEmailState(e.target.value);
  const passwordHandler = (e) => setPasswordState(e.target.value);
  const confirmedPasswordHandler = (e) => setConfirmedPasswordState(e.target.value);

  const signupHandler = (e) => {
      e.preventDefault();
      if (passwordState === confirmedPasswordState){
          if (passwordState.length > 7){
              const data = {
                  email: emailState,
                  username: usernameState,
                  displayName: displayNameState,
                  password: passwordState
              };
              props.onSignup(data.email, data.username, data.displayName, data.password);
          } else {
              setPasswordError(true);
              setPasswordErrorText('Please, provide a longer password (min. 8 characters)');
          }
      } else {
          setPasswordError(true);
          setPasswordErrorText('Password and confirmed password fields don\'t match');
      }
  };

  if (props.token){
    return  <Redirect to='/' />
  };

  let showUsernameError = false;
  let usernameErrorText = null;
  if (props.error === 'username already in use.') {
      showUsernameError = true
      usernameErrorText = props.error
  };

  let showEmailError = false;
  let emailErrorText = null;
  if (props.error === 'email already in use.') {
      showEmailError = true
      emailErrorText = props.error
  };

  let signupForm = (
        <form className={classes.form} onSubmit={signupHandler} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={showUsernameError}
                helperText={usernameErrorText}
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Typography variant="caption">
                      {usernameState ? usernameState.length : 0}/50 </Typography>
                      </InputAdornment>
                }}
                value={usernameState}
                onChange={usernameHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Typography variant="caption">
                      {displayNameState ? displayNameState.length : 0}/50 </Typography>
                      </InputAdornment>
                }}
                value={displayNameState}
                onChange={displaynameHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={showEmailError}
                helperText={emailErrorText}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Typography variant="caption">
                      {emailState ? emailState.length : 0}/100 </Typography>
                      </InputAdornment>
                }}
                value={emailState}
                onChange={emailHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError}
                helperText={passwordErrorText}
                variant="outlined"
                required
                fullWidth
                name="confirmedPassword"
                label="Confirm Password"
                type="password"
                id="confirmedPassword"
                autoComplete="current-password"
                value={confirmedPasswordState}
                onChange={confirmedPasswordHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2" component={Link} className={classes.noDecoration} color='primary' to='/login'>
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </form>
  );

  if (props.loading) {
    signupForm = <Spinner />
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {signupForm}
      </div>
    </Container>
  );
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
      onSignup: (email, username, displayName, password) => dispatch(actions.signup(email, username, displayName, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);