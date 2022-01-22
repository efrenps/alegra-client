import GraphQLClient from '../apollo/GraphQLClient';
import ManagerQuery from '../graphQL/query/ManagerQuery';
import ManagerMutate from '../graphQL/mutate/ManagerMutate';

export default class ManagerService {
    constructor() {
        this.graphqlClient = new GraphQLClient();
    }

    async getMenus() {
        return this.graphqlClient
            .query(ManagerQuery.GET_MENUS)
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
            .query(ManagerQuery.GET_MENU_ORDERS, input)
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

    async getList(filter = {}) {
        return this.graphqlClient
            .query(ManagerQuery.LIST_PRODUCTS_VENDOR, filter)
            .then((response) => {
                const { data, graphQLErrors } = response;
                if (graphQLErrors) {
                    return { graphQLErrors };
                }

                const { getProductsVendor } = data;

                return {
                    data: { products: getProductsVendor },
                };
            });
    }

    async getProductDetail(input = {}) {
        return this.graphqlClient
            .query(ManagerQuery.PRODUCT_VENDOR_DETAIL, input)
            .then((response) => {
                const { data, graphQLErrors } = response;
                if (graphQLErrors) {
                    return { graphQLErrors };
                }

                const { getProductVendor } = data;
                return {
                    data: { product: getProductVendor },
                };
            });
    }

    
    async createMenuOrder(input) {
        return this.graphqlClient
            .mutate(ManagerMutate.CREATE_MENU_ORDER);
    }

    
    async updateProduct(input) {
        return this.graphqlClient
            .mutate(ManagerMutate.UPDATE_PRODUCT_VENDOR, input);
    }
}
