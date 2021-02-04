import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, ButtonGroup, IconButton, Divider } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import moment from 'moment'

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
        <React.Fragment>
        <Grid container>
            <Grid item xs={6}>
                <Typography color="textSecondary" variant="body2">{props.username} - {moment(props.date).format('Do MMM YY')}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.choiceButtons}>
                <ButtonGroup size="small" >
                    <IconButton size='small'><ThumbUp/></IconButton>
                    <IconButton size='small'><ThumbDown/></IconButton>
                </ButtonGroup>
            </Grid>
        </Grid>
        <Divider />
        </React.Fragment>
    )
};

export default ArgumentMeta