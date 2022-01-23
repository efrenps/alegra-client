import React, { useState } from 'react';

// Router
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

// Component

import ProtectedRoute from './containers/ProtectedRoute';
import RedirectNotFound from './containers/RedirectNotFound';
import BaseLayout from './layout/BaseLayout';
import Login from './Login';
import ManagerDashboard from './ManagerDashboard';
import KitchenDashboard from './KitchenDashboard';

// Utils
import '../services/api/Axios.configuration';
import KeyStore from '../utils/KeyStore';
import Permissions from '../utils/Permissions';

import UserContext from './UserContext';
import StorageDashboard from './StorageDashboard';

const App = () => {
    const keyStore = new KeyStore();
    const [userInformation, setUserInformation] = useState();

    const updateUserInformation = (record) => {
        setUserInformation(record);
    };
    
    return (
        <UserContext.Provider value={{ userInformation, updateUserInformation }}>
            <Router>
                <Switch>
                    <Route
                        path="/login"
                        sensitive={false}
                        render={() => (!keyStore.exists() ? <Login /> : <Redirect to={{ pathname: '/' }} />)}
                    />
                    <Route path="/">
                        <BaseLayout>
                            <Switch>
                                <ProtectedRoute
                                    path="/"
                                    exact
                                >
                                    <Redirect to={{ pathname: '/home' }} />
                                </ProtectedRoute>
                                <ProtectedRoute
                                    path="/home"
                                    exact
                                >   <Redirect to={{ pathname: '/home' }} />
                                </ProtectedRoute>
                                {keyStore.hasPermission(Permissions.MANAGER) && (
                                    <ProtectedRoute
                                        path='/manager-dashboard'
                                        exact
                                    >
                                        <ManagerDashboard />
                                    </ProtectedRoute>
                                )}
                                {(keyStore.hasPermission(Permissions.MANAGER) || keyStore.hasPermission(Permissions.KITCHEN)) && (
                                    <ProtectedRoute
                                        path='/kitchen-dashboard'
                                        exact
                                    >
                                        <KitchenDashboard />
                                    </ProtectedRoute>
                                )}
                                {(keyStore.hasPermission(Permissions.MANAGER) || keyStore.hasPermission(Permissions.FOOD_STORAGE)) && (
                                    <ProtectedRoute
                                        path='/storage-dashboard'
                                        exact
                                    >
                                        <StorageDashboard />
                                    </ProtectedRoute>
                                )}
                                <RedirectNotFound />
                            </Switch>
                        </BaseLayout>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
};

export default App;
