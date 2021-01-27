import { AppBar, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';
import React from 'react';


function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
};

const usedStyles = makeStyles(() => ({
    typographyStyles: { 
        flex: 1
    } 
}));

const Header = () => {
    const classes = usedStyles();
    return (
        <ElevationScroll>
            <AppBar position='fixed'>
                <Toolbar>
                    <Typography className={classes.typographyStyles}>wescuss</Typography>
                    <AccountCircleIcon/>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
};

export default Header;