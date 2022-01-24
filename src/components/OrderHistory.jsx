/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

// Components and Others
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import OrderHistoryContainer from './containers/OrderHistoryContainer';
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

class OrderHistory extends Component {
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
                Header: "Order #",
                id: 'menuOrderId',
                accessor: 'menuOrderId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    return (
                        <Typography variant="body1" component="div">
                            { original.menuOrderId }
                        </Typography>      
                    );
                },
            },
            {
                Header: 'Meal',
                id: 'menuOrderId',
                accessor: 'menuOrderId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    const { menu } = original;
                    const mealName = menu ? menu.name : '-';
                    return (
                        <Typography variant="body1" component="div">
                            { mealName }
                        </Typography>      
                    );
                },
            },
            {
                Header: 'Status',
                id: 'status',
                accessor: 'status',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    return (
                        <Typography variant="body1" component="div">
                            { original.status }
                        </Typography>      
                    );
                },
            },
            {
                Header: 'Quantity',
                id: 'quantity',
                accessor: 'quantity',
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
                Header: 'Date',
                id: 'menuOrderId',
                accessor: 'menuOrderId',
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
                classes, menuOrders, loading
            },
        } = this;

        return (
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.marginLeft}>
                    <Grid item xs>
                        <Typography variant="h1" component="div">
                            Meal Orders
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
                                    data={menuOrders}
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


OrderHistory.propTypes = {
    classes: PropTypes.object.isRequired,
    menuOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles)(OrderHistoryContainer(OrderHistory)));
