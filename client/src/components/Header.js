import { AppBar, Toolbar, Typography, useScrollTrigger, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


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

const usedStyles = makeStyles(theme => ({
    typographyStyles: { 
        flex: 1
    },
    toolBarMargin: {
        ...theme.mixins.toolbar
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    styledIndicator: {
        backgroundColor: '#0c1613'
    }
}));

const Header = () => {
    const classes = usedStyles();
    const [value, setValue] = useState(0);
    const handleChange = (e, value) => {
        setValue(value);
    };

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Typography className={classes.typographyStyles} variant='h5'>wescuss</Typography>
                        <Tabs value={value} onChange={handleChange} className={classes.tabContainer} classes={{indicator: classes.styledIndicator}} >
                            <Tab component={Link} to='/' label="Home" />
                            <Tab component={Link} to='/newpost' label="New Post" />
                            <Tab component={Link} to='/login' label="Log In" />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolBarMargin}/>
        </React.Fragment>
    )
};

export default Header;