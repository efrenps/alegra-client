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
        this.subscription = null;

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
        this.unsubscribe();
    }

    getIngredients() {
        this.service.getIngredients()
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    console.log(graphQLErrors);
                    return;
                }

                console.log(data);

                if (data && data.ingredients) {
                    const { ingredients } = data;
                    this.setState({ ingredients });
                }
            })
            .finally(() => {
                this.getMenuOrders();
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

                console.log(data);

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
                this.subscribe();
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
            });
    }

    //SUBSCRIPTIONS
    subscribe() {
        this.unsubscribe();
        this.graphqlClient.subscribe(this.responseSubscription, Subscriptions.MENU_ORDERS)
            .then((response) => {
                this.subscription = response;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    responseSubscription(record) {
        console.log('responseSubscription');
        console.log(record);
        const { data } = record;

        if (data && data.menuOrders) {
            const { menuOrders: { type, menuOrder } } = data;

            switch (type) {
            case SubscriptionActionType.CREATED:
                this.addSubscriptionRecord(menuOrder);
                break;
            case SubscriptionActionType.UPDATED:
                this.updateSubscriptionRecord(menuOrder);
                break;
            default:
            }
        }
    }

    addSubscriptionRecord(record) {
        this.setState(({ menuOrders }) => {
            const newRecords = update(menuOrders, { $unshift: [record] });

            return { menuOrders: newRecords };
        });
    }

    updateSubscriptionRecord(record) {
        this.setState(({ menuOrders }) => {
            const newRecords = [...menuOrders];

            const recordIndex = newRecords.findIndex((item) => item.menuOrderId === record.menuOrderId);
            newRecords[recordIndex] = { ...record };

            return { menuOrders: newRecords };
        });
    }

    unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    initBind() {
        this.getIngredients = this.getIngredients.bind(this);
        this.getMenus = this.getMenus.bind(this);
        this.getMenuOrders = this.getMenuOrders.bind(this);
        this.onSortMeal = this.onSortMeal.bind(this);
        this.onUpdateOrderStatus = this.onUpdateOrderStatus.bind(this);
        
        this.subscribe = this.subscribe.bind(this);
        this.responseSubscription = this.responseSubscription.bind(this);
        this.addSubscriptionRecord = this.addSubscriptionRecord.bind(this);
        this.updateSubscriptionRecord = this.updateSubscriptionRecord.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
    }

    render() {
        const { props, state } = this;

        return (
            <WrappedComponent
                {...props}
                {...state}
                onSortMeal={this.onSortMeal}
                onUpdateOrderStatus={this.onUpdateOrderStatus}
            />
        );
    }

} 

export default StorageDashboardContainer;
