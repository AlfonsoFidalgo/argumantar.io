import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: theme.spacing(20)
    },
  }));

const Spinner = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}><CircularProgress size={70} /></div>
    )
};

export default Spinner;