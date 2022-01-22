import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import KeyStore from '../../utils/KeyStore';

const ProtectedRoute = ({ children, ...rest }) => (
    <Route
        {...rest}
        render={
            () => (new KeyStore().exists() ? children : <Redirect to={{ pathname: '/login' }} />)
        }
        onEnter
    />
);

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
