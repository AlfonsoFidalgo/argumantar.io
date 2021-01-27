import { AppBar, Toolbar, Typography } from '@material-ui/core';
//import ForumIcon from '@material-ui/icons/Forum';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const usedStyles = makeStyles(() => ({
    typographyStyles: { 
        flex: 1
    } 
}));

const Header = () => {
    const classes = usedStyles();
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography className={classes.typographyStyles}>Main Menu</Typography>
                <AccountCircleIcon/>
            </Toolbar>
        </AppBar>
    )
};

export default Header;