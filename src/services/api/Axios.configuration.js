/* eslint-disable no-param-reassign */

import Axios from 'axios';
import { configure } from 'axios-hooks';
import KeyStore from '../../utils/KeyStore';

const keyStore = new KeyStore();

const axios = Axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        ContentType: 'application/json',
        'x-auth-type': 'oauth2',
    },
});

axios.interceptors.request.use(
    async (config) => {
        const token = keyStore.getToken();

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: token,
            };
        }
        return config;
    },
    (error) => Promise.reject(error),
);

const defaultOptions = {
    useCache: false,
};

configure({ axios, defaultOptions });
