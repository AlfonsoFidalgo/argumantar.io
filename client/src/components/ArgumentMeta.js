import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, ButtonGroup, IconButton } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
      choiceButtons: {
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: theme.spacing(1)
      }
}));

const ArgumentMeta = (props) => {
    const classes = useStyles();
    return(
        <Grid container>
            <Grid item xs={6}>
                <Typography color="textSecondary">{props.username} - {props.date}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.choiceButtons}>
                <ButtonGroup size="small" >
                    <IconButton><ThumbUp/></IconButton>
                    <IconButton><ThumbDown/></IconButton>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
};

export default ArgumentMeta