import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import KeyStore from '../../utils/KeyStore';

const RedirectNotFound = () => (
    <Route
        path="*"
        render={() => (new KeyStore().exists() ? (<Redirect to="/" />) : (<Redirect to="/login" />))}
    />
);

export default RedirectNotFound;
