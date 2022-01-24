import GraphQLClient from '../apollo/GraphQLClient';
import Queries from '../graphQL/query/Queries';
import Mutations from '../graphQL/mutate/Mutations';

export default class DashboardService {
    constructor() {
        this.graphqlClient = new GraphQLClient();
    }

    async getIngredients() {
        return this.graphqlClient
            .query(Queries.GET_INGREDIENTS)
            .then((response) => {
                const { data, graphQLErrors } = response;
                if (graphQLErrors) {
                    return { graphQLErrors };
                }

                const { getIngredients } = data;  

                return {
                    data: { ingredients: getIngredients },
                };
            });
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

    async getSimplifiedMenuOrders(input) {
        return this.graphqlClient
            .query(Queries.GET_MENU_ORDERS_SIMPLIFIED, input)
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

    async assingMenuInOrder(input) {
        return this.graphqlClient
            .mutate(Mutations.ASSING_MENU_IN_ORDER, input);
    }

    async updateMenuOrderStatus(input) {
        return this.graphqlClient
            .mutate(Mutations.UPDATE_MENU_ORDER_STATUS, input);
    }

    async buyIngredient(input) {
        return this.graphqlClient
            .mutate(Mutations.BUY_INGREDIENT, input);
    }

    async getInvoices(input) {
        return this.graphqlClient
            .query(Queries.GET_INVOICES, input)
            .then((response) => {
                const { data, graphQLErrors } = response;
                if (graphQLErrors) {
                    return { graphQLErrors };
                }

                const { getInvoices } = data;

                return {
                    data: { invoices: getInvoices },
                };
            });
    }

    
}
