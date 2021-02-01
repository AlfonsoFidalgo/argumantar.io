import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Grid } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({
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
        flexDirection: 'row-reverse'
    }
  });

const Post = (props) => {
    const [userState, setUserState] = useState();
    const [dateState, setDateState] = useState();
    const [titleState, setTitleState] = useState();
    const [bodyState, setBodyState] = useState();
    const [numArgsState, setNumArgsState] = useState();
    const [agreeRateState, setAgreeRateState] = useState();
    const [disagreeRateState, setDisagreeRateState] = useState(); 

    useEffect(() => {
        setUserState(props.location.state.user);
        setDateState(props.location.state.date);
        setTitleState(props.location.state.title);
        setBodyState(props.location.state.body);
        setNumArgsState(props.location.state.numArgs);
        setAgreeRateState(props.location.state.agreeRate);
        setDisagreeRateState(props.location.state.disagreeRate);
    }, [props]);


    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {userState} - {moment(dateState).format('Do MMM YY')}
                </Typography>
                <Typography variant="h6" component="h2">
                    {titleState}
                </Typography>
                <Typography variant="body1" component="p">
                    {bodyState}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {numArgsState} people talking about this. <br/>
                    {agreeRateState * 100}% agree, {disagreeRateState * 100}% disagree.
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
                        <ButtonGroup color="primary" size="small" aria-label="outlined secondary button group">
                            <Button>Agree</Button>
                            <Button>Disagree</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default Post;
