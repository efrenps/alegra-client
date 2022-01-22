import React, { Component } from 'react';

import update from 'immutability-helper';
import SubscriptionActionType from '../../utils/SubscriptionActionType';
import ModalUtils from '../../utils/ModalUtils';

// GraphQL
import ManagerService from '../../services/modules/ManagerService';
import GraphQLClient from '../../services/apollo/GraphQLClient';
import ManagerSubscription from '../../services/graphQL/subscription/ManagerSubscription';

const ManagerDashboardContainer = (WrappedComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.graphqlClient = new GraphQLClient();
        this.managerService = new ManagerService();
        this.subscription = null;

        this.initBind();
    }

    state = {
        menus: [],
        menuOrders: [],
        loading: false,
    }

    componentDidMount() {
        this.getMenus();
        this.getMenuOrders();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getMenus() {
        this.setState({ loading: true });
        this.managerService.getMenus()
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
                this.setState({ loading: false });
            });
    }

    getMenuOrders() {
        const input = {
            paginate: {
                init: 0,
                limit: 200,
            },
            sort: {
                fieldName: 'createdAt',
                dir: 'DESC',
            },
            filter: {
                status: ['pending', 'cooking', 'storage', 'ready'],
            },
        };

        this.setState({ loading: true });
        this.managerService.getMenuOrders(input)
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

    onAdd() {
        this.managerService.createMenuOrder()
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    ModalUtils.errorMessage(graphQLErrors);
                    return;
                }

                if (data && data.createMenuOrder) {
                    ModalUtils.successMessage(null, 'Order created successfully');
                }
            });
    }

    onDelivery() {
        
    }

    //SUBSCRIPTIONS
    subscribe() {
        this.unsubscribe();
        this.graphqlClient.subscribe(this.responseSubscription, ManagerSubscription.MENU_ORDERS)
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
        this.getMenus = this.getMenus.bind(this);
        this.getMenuOrders = this.getMenuOrders.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelivery = this.onDelivery.bind(this);
        
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
                onAddOrder={this.onAdd}
                onDeliveryOrder={this.onDelivery}
            />
        );
    }

} 

export default ManagerDashboardContainer;