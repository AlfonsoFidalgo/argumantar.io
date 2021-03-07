import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const Logout = (props) => {

    useEffect(() => {
        props.onLogout();
        props.wipeChoices();
    });

    return (
        <Redirect to='/' />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        wipeChoices: () => dispatch(actions.setChoices([]))
    };
}

export default connect(null, mapDispatchToProps)(Logout);