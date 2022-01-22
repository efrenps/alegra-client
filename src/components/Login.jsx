import React, { useState, useContext } from 'react';
import loginBackground from '../assets/loginBackground.jpg';
import LoginStyles from '../styles/LoginStyles';
import {
    Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import KeyStore from '../utils/KeyStore';
import { Redirect } from 'react-router-dom';

// Material UI
import { makeStyles, CircularProgress } from '@material-ui/core';

// Http
import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import UserContext from './UserContext';

const useStyles = makeStyles((theme) => ({
    mainLogin: {
        backgroundImage: `url(${loginBackground})`,
        height: '100%',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    ...LoginStyles.login(theme),
}));
const keyStore = new KeyStore();
const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: process.env.REACT_APP_GRAPHQL_HTTP }),
});

const Login = () => {
    const { updateUserInformation } = useContext(UserContext);
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const classes = useStyles();

    const [{ data, loading }, executeLogin] = useAxios({ url: '/login', method: 'POST' }, { manual: true });

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await executeLogin({
                data: {
                    username: userName,
                    password,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (data) {
        const loginData = data?.data?.login;
        const { access_token, user } = loginData;
        const record = {
            token: access_token,
            ...user,
        }

        console.log(record);
        keyStore.save(record);
        updateUserInformation(record);
        return <Redirect to={`/${user.scope}-dashboard`} />;
    }

    return (
        <div className={classes.mainLogin}>
            <div className={classes.loginContainer}>
                <Container className="d-flex-center d-flex-auto">
                    <div className="login-content">
                        <div className="d-flex justify-content-center logo-container">
                            <img className="img" src="https://app.alegra.com/welcome/img/logo.a0d24580.svg" alt="Alegra" />
                        </div>
                        <Form onSubmit={(e) => handleLogin(e)}>
                            <Form.Group controlId="formUserName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    required
                                    onChange={
                                        (e) => setUserName(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {loading ? <CircularProgress size="1em" color="inherit" />
                                    : (
                                        <svg
                                            viewBox="64 64 896 896"
                                            focusable="false"
                                            className=""
                                            data-icon="login"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            {/* eslint-disable-next-line max-len */}
                                            <path d="M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 0 1 520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 0 1 270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 0 1 0 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z" />
                                        </svg>
                                    )}
                                <span className="icon">Sign In</span>
                            </Button>
                        </Form>
                    </div>
                </Container>
                <Row>
                    <Col className="login-footer">
                        <span>{`Copyright © ${new Date().getUTCFullYear()}`}</span>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Login;
