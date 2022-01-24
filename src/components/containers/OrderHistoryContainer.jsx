import React, { Component } from 'react';

// GraphQL
import DashboardService from '../../services/modules/DashboardService';
import { MENU_ORDER_STATUS} from '../../utils/Enums';

const OrderHistoryContainer = (WrappedComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.service = new DashboardService();

        this.initBind();
    }

    state = {
        menuOrders: [],
        loading: false,
    }

    componentDidMount() {
        this.getMenuOrders();
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
                status: [MENU_ORDER_STATUS.PENDING, MENU_ORDER_STATUS.COOKING, MENU_ORDER_STATUS.STORAGE, MENU_ORDER_STATUS.READY, MENU_ORDER_STATUS.DELIVERED],
            },
        };

        this.setState({ loading: true });
        this.service.getMenuOrders(input)
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
            });
    }


    initBind() {
        this.getMenuOrders = this.getMenuOrders.bind(this);
    }

    render() {
        const { props, state } = this;

        return (
            <WrappedComponent
                {...props}
                {...state}
            />
        );
    }

} 

export default OrderHistoryContainer;
