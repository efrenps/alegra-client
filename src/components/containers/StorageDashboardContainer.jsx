import React, { Component } from 'react';

import update from 'immutability-helper';
import SubscriptionActionType from '../../utils/SubscriptionActionType';
import ModalUtils from '../../utils/ModalUtils';

// GraphQL
import DashboardService from '../../services/modules/DashboardService';
import GraphQLClient from '../../services/apollo/GraphQLClient';
import Subscriptions from '../../services/graphQL/subscription/Subscriptions';

const StorageDashboardContainer = (WrappedComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.graphqlClient = new GraphQLClient();
        this.service = new DashboardService();
        this.menuOrderSubscription = null;
        this.ingredientSubscription = null;

        this.initBind();
    }

    state = {
        ingredients: [],
        menus: [],
        menuOrders: [],
        loading: false,
        selectedMenuId: null,
    }

    componentDidMount() {
        this.getIngredients();
        this.getMenus();
    }

    componentWillUnmount() {
        this.unsubscribeMenuOrder();
    }

    getIngredients() {
        this.service.getIngredients()
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    console.log(graphQLErrors);
                    return;
                }

                if (data && data.ingredients) {
                    const { ingredients } = data;
                    this.setState({ ingredients });
                }
            })
            .finally(() => {
                this.getMenuOrders();
                this.subscribeIngredient();
            });
    }

    getMenus() {
        this.setState({ loading: true });
        this.service.getMenus()
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    console.log(graphQLErrors);
                    return;
                }

                if (data && data.menus) {
                    const { menus } = data;
                    this.setState({ menus });
                }
            })
            .finally(() => {
                this.getMenuOrders();
            });
    }

    getMenuOrders() {
        const input = {
            paginate: {
                init: 0,
                limit: 200,
            },
            sort: {
                fieldName: 'menuOrderId',
                dir: 'DESC',
            },
            filter: {
                status: ['storage'],
            },
        };

        this.setState({ loading: true });
        this.service.getSimplifiedMenuOrders(input)
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    console.log(graphQLErrors);
                    return;
                }

                if (data && data.menuOrders) {
                    const { menuOrders } = data;
                    this.setState({ menuOrders });
                }
            })
            .finally(() => {
                this.setState({ loading: false });
                this.subscribeMenuOrder();
            });
    }

    onSortMeal(menuOrderId) {
        const { state } = this;
        const { menus } = state;

        const menuIds = menus.map(item => {
            return item.menuId
        });

        const selectedMenuId = menuIds[Math.floor(Math.random() * menuIds.length)];
        this.setState({ selectedMenuId });

        const input = {
            menuOrderId,
            menuId: selectedMenuId
        };

        this.service.assingMenuInOrder(input)
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    ModalUtils.errorMessage(graphQLErrors);
                    return;
                }

                if (data && data.assingMenuInOrder) {
                    ModalUtils.successMessage(null, 'Menu assigned successfully');
                }
            })
            .finally(() => {
                this.setState({ selectedMenuId: null });
            });
    }

    onUpdateOrderStatus(menuOrderId) {
        const input = {
            menuOrderId
        };

        this.setState({ selectedMenuId: menuOrderId });
        this.service.updateMenuOrderStatus(input)
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    ModalUtils.errorMessage(graphQLErrors);
                    return;
                }

                if (data && data.updateMenuOrderStatus) {
                    ModalUtils.successMessage(null, 'Order updated successfully');
                }
            })
            .finally(() => {
                this.setState({ selectedMenuId: null });
            });
    }

    //SUBSCRIPTIONS
    subscribeMenuOrder() {
        this.unsubscribeMenuOrder();
        this.graphqlClient.subscribe(this.responseMenuOrderSubscription, Subscriptions.MENU_ORDERS)
            .then((response) => {
                this.menuOrderSubscription = response;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    responseMenuOrderSubscription(record) {
        const { data } = record;

        if (data && data.menuOrders) {
            const { menuOrders: { type, menuOrder } } = data;

            switch (type) {
            case SubscriptionActionType.CREATED:
                this.addSubscriptionMenuOrder(menuOrder);
                break;
            case SubscriptionActionType.UPDATED:
                this.updateSubscriptionMenuOrder(menuOrder);
                break;
            default:
            }
        }
    }

    addSubscriptionMenuOrder(record) {
        this.setState(({ menuOrders }) => {
            const newRecords = update(menuOrders, { $unshift: [record] });

            return { menuOrders: newRecords };
        });
    }

    updateSubscriptionMenuOrder(record) {
        this.setState(({ menuOrders }) => {
            const newRecords = [...menuOrders];

            const recordIndex = newRecords.findIndex((item) => item.menuOrderId === record.menuOrderId);
            newRecords[recordIndex] = { ...record };

            return { menuOrders: newRecords };
        });
    }

    unsubscribeMenuOrder() {
        if (this.menuOrderSubscription) {
            this.menuOrderSubscription.unsubscribe();
        }
    }
    
    subscribeIngredient() {
        this.unsubscribeIngredient();
        this.graphqlClient.subscribe(this.responseIngredientSubscription, Subscriptions.INGREDIENTS)
            .then((response) => {
                this.ingredientSubscription = response;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    responseIngredientSubscription(record) {
        const { data } = record;

        if (data && data.ingredients) {
            const { ingredients: { type, ingredient } } = data;

            if (type === SubscriptionActionType.UPDATED) {
                this.updateSubscriptionIngredient(ingredient);
            }
        }
    }

    updateSubscriptionIngredient(record) {
        this.setState(({ ingredients }) => {
            const newRecords = [...ingredients];

            const recordIndex = newRecords.findIndex((item) => item.ingredientId === record.ingredientId);
            newRecords[recordIndex] = { ...record };

            return { ingredients: newRecords };
        });
    }

    unsubscribeIngredient() {
        if (this.ingredientSubscription) {
            this.ingredientSubscription.unsubscribe();
        }
    }

    initBind() {
        this.getIngredients = this.getIngredients.bind(this);
        this.getMenus = this.getMenus.bind(this);
        this.getMenuOrders = this.getMenuOrders.bind(this);
        this.onUpdateOrderStatus = this.onUpdateOrderStatus.bind(this);
        
        this.subscribeMenuOrder = this.subscribeMenuOrder.bind(this);
        this.responseMenuOrderSubscription = this.responseMenuOrderSubscription.bind(this);
        this.addSubscriptionMenuOrder = this.addSubscriptionMenuOrder.bind(this);
        this.updateSubscriptionMenuOrder = this.updateSubscriptionMenuOrder.bind(this);
        this.unsubscribeMenuOrder = this.unsubscribeMenuOrder.bind(this);

        this.subscribeIngredient = this.subscribeIngredient.bind(this);
        this.responseIngredientSubscription = this.responseIngredientSubscription.bind(this);
        this.updateSubscriptionIngredient = this.updateSubscriptionIngredient.bind(this);
        this.unsubscribeIngredient = this.unsubscribeIngredient.bind(this);
    }

    render() {
        const { props, state } = this;

        return (
            <WrappedComponent
                {...props}
                {...state}
                onUpdateOrderStatus={this.onUpdateOrderStatus}
            />
        );
    }

} 

export default StorageDashboardContainer;
