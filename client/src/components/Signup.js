import React, { useState, useEffect } from 'react';
import {Avatar, Button, TextField, Grid, makeStyles, Container, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  noDecoration: {
    textDecoration: 'none'
  }
}));

export default function Signup(props) {  
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [usernameState, setUsernameState] = useState('');
  const [displayNameState, setDisplayNameState] = useState('');
  const [confirmedPasswordState, setConfirmedPasswordState] = useState('');
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
              axios.post('http://localhost:3001/user/signup', data)
              .then(response => console.log(response.data))
              .catch(err => console.log(err.response.data))
          } else {
              console.log('Please, provide a longer password (min. 8 characters)');
          }
      } else {
          console.log('Password and confirmed password fields don\'t match');
      }
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
        <form className={classes.form} onSubmit={signupHandler} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
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
                value={displayNameState}
                onChange={displaynameHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
      </div>
    </Container>
  );
}