import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
// import UserQuery from 'services/graphQL/query/UserQuery';

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

// Utils
import '../services/api/Axios.configuration';
import KeyStore from '../utils/KeyStore';
import Permissions from '../utils/Permissions';

import UserContext from './UserContext';

const App = () => {
    const keyStore = new KeyStore();
    const token = !keyStore.exists();
    const [userInformation, setUserInformation] = useState();
    //const { loading, data, error } = useQuery(UserQuery.USER_DETAILS, { skip: token });

    // useEffect(() => {
    //     if (!error && !loading) {
    //         setUserInformation(data?.userDetails);
    //     }
    // }, [data, error, loading]);

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
