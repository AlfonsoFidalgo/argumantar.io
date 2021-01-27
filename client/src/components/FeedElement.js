import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
      marginBottom: 12,
    },
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
            <Typography className={classes.pos} color="textSecondary">
                {props.arguments} people talking about this. <br/>
                {props.agreeRate *100}% agree, {props.disagreeRate *100}% disagree.
            </Typography>
            <Typography variant="body2" component="p">
                {props.body}
            </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Read More</Button>
            </CardActions>
        </Card>
    )
};

export default FeedElement;