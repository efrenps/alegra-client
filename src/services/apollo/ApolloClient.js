import {
    ApolloClient, InMemoryCache, split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import KeyStore from '../../utils/KeyStore';
import { createUploadLink } from 'apollo-upload-client';

export const getApolloHeaders = () => ({
    HTTP_URL: process.env.REACT_APP_GRAPHQL_HTTP,
    WS_URL: process.env.REACT_APP_GRAPHQL_WS,
});

const keyStore = new KeyStore();
// Build an HTTP link
const httpLink = createUploadLink({
    uri: getApolloHeaders().HTTP_URL,
});

const getToken = () => `Bearer ${keyStore.getToken()}`;

// Create auth link to set headers like authorization and others
const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            authorization: token || '',
            'x-auth-type': 'oauth2',
        },
    };
});

// Create the Web Socket link to make ws requests
const wsLink = new WebSocketLink({
    uri: getApolloHeaders().WS_URL,
    options: {
        reconnect: true,
        lazy: true,
        connectionParams: async () => {
            const token = getToken();
            return {
                authorization: token,
                'x-auth-type': 'oauth2',
            };
        },
    },
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
    console.log("***** Eror link ***");
    console.log(networkError);
    console.log(graphQLErrors);
    if (graphQLErrors?.some((x) => x.message === 'UNAUTHENTICATED')
        || networkError?.result?.errors?.some((e) => e.extensions.code === 'UNAUTHENTICATED')) {
        keyStore.clear();
        const { origin } = window.location;
        window.location.replace(`${origin}/login`);
    }
});

// Use split to use one or the other link depending on the type of operation to be performed.
// If it is an http operation (query or mutation) use authLink, otherwise use wsLink
// More info: https://www.apollographql.com/docs/link/composition#directional
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);

        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    // Concat function merge links - in this case merges authLink with httpLink
    errorLink.concat(authLink.concat(httpLink)),
);

// Build Apollo Client with the specific link
const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

export default client;
