import React from 'react';
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

const FeedElement = (props) => {
    const classes = useStyles();
    return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.user} - {moment(props.date).format('Do MMM YY')}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {props.body}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.arguments} people talking about this. <br/>
                        {props.agreeRate *100}% agree, {props.disagreeRate *100}% disagree.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button component={Link} to={'/post/' + props.questionId} color="primary" variant="outlined" size="small">Read More</Button>
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
    )
};

export default FeedElement;