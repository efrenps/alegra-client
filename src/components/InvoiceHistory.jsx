/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

// Components and Others
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import InvoiceHistoryContainer from './containers/InvoiceHistoryContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    Container
} from 'react-bootstrap';
import moment from 'moment';

// Material UI
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DashboardStyles from '../styles/DashboardStyles';
import { Table } from './Table';

const styles = (theme) => DashboardStyles.listStyles(theme);

class InvoiceHistory extends Component {
    constructor(props) {
        super(props);
    }

    getColumns() {
        const columnStyle = {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
        };

        const columns = [
            {
                Header: "Invoice #",
                id: 'invoiceId',
                accessor: 'invoiceId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    return (
                        <Typography variant="body1" component="div">
                            { original.invoiceId }
                        </Typography>      
                    );
                },
            },
            {
                Header: 'Ingredient',
                id: 'invoiceId',
                accessor: 'invoiceId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    const { ingredient } = original;
                    return (
                        <Typography variant="body1" component="div">
                            { ingredient.name }
                        </Typography>      
                    );
                },
            },
            {
                Header: 'Quantity',
                id: 'invoiceId',
                accessor: 'invoiceId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    return (
                        <Typography variant="body1" component="div">
                            { original.quantity }
                        </Typography>      
                    );
                },
            },
            {
                Header: 'Purchased Date',
                id: 'invoiceId',
                accessor: 'invoiceId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    const purchasedDate = moment(original.createdAt, "x").format('YYYY-MM-DD h:mm a'); 
                    return (
                        <Typography variant="body1" component="div">
                            { purchasedDate }
                        </Typography>      
                    );
                },
            },
        ];

        return columns;
    }

    

    render() {
        const {
            props: {
                classes, invoices, loading
            },
        } = this;

        return (
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.marginLeft}>
                    <Grid item xs>
                        <Typography variant="h1" component="div">
                            Farmer Market Invoices
                        </Typography>  
                    </Grid>
                    
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Container className={classes.containerHistory}>
                                <Table
                                    load={loading}
                                    columns={this.getColumns()}
                                    data={invoices}
                                    rowSelected={false}
                                    sortable={false}
                                />
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>  
            </div>
        );
    }
}


InvoiceHistory.propTypes = {
    classes: PropTypes.object.isRequired,
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles)(InvoiceHistoryContainer(InvoiceHistory)));
