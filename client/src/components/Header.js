import { AppBar, Toolbar, Typography, useScrollTrigger, Tabs, Tab, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    },
    logoContainer: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}));

const Header = (props) => {
    const classes = usedStyles();
    const [value, setValue] = useState(0);

    const handleChange = (e, value) => {
        setValue(value);
    };

    useEffect(() => {
        if (window.location.pathname === '/' && value !== 0){
            setValue(0);
        } else if (window.location.pathname === '/newpost' && value !== 1){
            setValue(1);
        } else if (window.location.pathname === '/login' && value !== 2){
            setValue(2);
        }
    }, [value]);

    let profileLink = (
        <Tab component={Link} to='/login' label="Log In" />
    );

    if (props.isAuth) {
        profileLink = (
            <Tab component={Link} to='/logout' label={`Log Out (${props.username})`} />
        )
    }

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Button component={Link} to='/' className={classes.logoContainer} onClick={() => setValue(0)} disableRipple>
                            <Typography className={classes.typographyStyles} variant='h6'>razonalo</Typography>
                        </Button>
                        <Tabs value={value} onChange={handleChange} className={classes.tabContainer} classes={{indicator: classes.styledIndicator}} >
                            <Tab component={Link} to='/' label="Home" />
                            <Tab component={Link} to='/newpost' label="New Post" />
                            {profileLink}
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolBarMargin}/>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        username: state.auth.username
    };
};

export default connect(mapStateToProps)(Header);