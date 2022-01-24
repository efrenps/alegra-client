import React, { Component } from 'react';

// GraphQL
import DashboardService from '../../services/modules/DashboardService';

const InvoiceHistoryContainer = (WrappedComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.service = new DashboardService();

        this.initBind();
    }

    state = {
        invoices: [],
        loading: false,
    }

    componentDidMount() {
        this.getInvoices();
    }

    getInvoices() {
        const input = {
            paginate: {
                init: 0,
                limit: 200,
            },
            sort: {
                fieldName: 'invoiceId',
                dir: 'DESC',
            },
        };

        this.setState({ loading: true });
        this.service.getInvoices(input)
            .then((response) => {
                const { data, graphQLErrors } = response;

                if (graphQLErrors) {
                    console.log(graphQLErrors);
                    return;
                }

                if (data && data.invoices) {
                    const { invoices } = data;
                    this.setState({ invoices });
                }
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }


    initBind() {
        this.getInvoices = this.getInvoices.bind(this);
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

export default InvoiceHistoryContainer;
