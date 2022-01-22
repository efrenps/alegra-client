import GraphQLClient from '../apollo/GraphQLClient';
import Queries from '../graphQL/query/Queries';
import Mutations from '../graphQL/mutate/Mutations';

export default class DashboardService {
    constructor() {
        this.graphqlClient = new GraphQLClient();
    }

    async getMenus() {
        return this.graphqlClient
            .query(Queries.GET_MENUS)
            .then((response) => {
                const { data, graphQLErrors } = response;
                if (graphQLErrors) {
                    return { graphQLErrors };
                }

                const { getMenus } = data;  

                return {
                    data: { menus: getMenus },
                };
            });
    }

    async getMenuOrders(input) {
        return this.graphqlClient
            .query(Queries.GET_MENU_ORDERS, input)
            .then((response) => {
                const { data, graphQLErrors } = response;
                if (graphQLErrors) {
                    return { graphQLErrors };
                }

                const { getMenuOrders } = data;

                return {
                    data: { menuOrders: getMenuOrders },
                };
            });
    }

    async createMenuOrder() {
        return this.graphqlClient
            .mutate(Mutations.CREATE_MENU_ORDER);
    }
}
