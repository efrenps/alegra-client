import client from '../apollo/ApolloClient';

export default class GraphQLClient {
    query = async (query, variables = {}, fetchPolicy = 'no-cache') => {
        const apolloQuery = await client.query({
            query,
            variables,
            fetchPolicy,
        }).catch((error) => error);

        return apolloQuery;
    }

    subscribe =  async (executeSubscription, query, variables = {}, fetchPolicy = 'no-cache') => {
        const params = {
            query,
            variables,
            fetchPolicy,
        };

        return client.subscribe(params).subscribe((data) => {
            executeSubscription(data);
            return data;
        });
    };

    mutate = async (mutation, variables = {}, fetchPolicy = 'no-cache') => {
        const apolloMutate = await client.mutate({
            mutation,
            variables,
            fetchPolicy,
        }).catch((error) => error);

        return apolloMutate;
    }
}
