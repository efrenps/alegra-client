import axios from 'axios';

export default class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_GRAPHQL_HTTP,
        });
    }

    login(credentials) {
        return this.client.post('/login', credentials);
    }
}
