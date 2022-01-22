/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

// Components and Others
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ManagerDashboardContainer from './containers/ManagerDashboardContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    Container
} from 'react-bootstrap';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DashboardStyles from '../styles/DashboardStyles';
import { Table } from './Table';

const styles = (theme) => DashboardStyles.listStyles(theme);

class ManagerDashboard extends Component {
    constructor(props) {
        super(props);
    }

    getColumns(stage) {
        const {
            props: {
                classes
            },
        } = this;
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
                Header: stage,
                id: 'menuOrderId',
                accessor: 'menuOrderId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    let subtitle = '';

                    if (original.menuId && original.menu) {
                        const { menu } = original;
                        subtitle = menu.name;
                    }

                    return (
                        <Paper className={classes.paper} key={ `key-${original.menuOrderId}` }>
                            <Card className={classes.rootCard} variant="outlined">
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        { `Order #${original.menuOrderId}` }
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        { subtitle }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>        
                    );
                },
            },
        ];

        return columns;
    }

    filterMenuOrders (stage) {
        const {
            props: {
                menuOrders
            },
        } = this;

        let filter = null;
        if (stage === 'Pending') {
            filter = (element) => (element.status === 'pending');
        } else if (stage === 'In-Progess') {
            filter = (element) => (element.status === 'storage' || element.status === 'cooking');
        } else if (stage === 'Ready') {
            filter = (element) => element.status === 'ready';
        } 

        return menuOrders.filter(filter);
    }

    renderIngredients (menu) {
        const ingredients = [];
        menu.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.name);
        });
        return ingredients.join(', ');
    }

    render() {
        const {
            props: {
                classes, menus, onAddOrder, loading
            },
        } = this;

        return (
            <div className={classes.root}>
                <Grid container className={classes.topSpace} spacing={1}>
                        {menus.map((menu, index) => (
                            <Grid item xs>
                                <Paper className={classes.paper}>
                                    <Card className={classes.rootCard} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h4" component="div">
                                                { menu.name }
                                            </Typography>
                                            <Typography variant="body1" component="div">
                                                { this.renderIngredients(menu) }
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                </Grid>
                <Grid container className={classes.topSpace} spacing={3}>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                            <Button
                                size="small"
                                variant="contained"
                                className={clsx(classes.button, classes.newButton)}
                                onClick={() => onAddOrder()}
                            >
                                Order meal
                            </Button>
                            </Paper>
                        </Grid>
                </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <Container className={classes.containerSplit}>
                                    <Table
                                        load={loading}
                                        columns={this.getColumns('Pending')}
                                        data={this.filterMenuOrders('Pending')}
                                        rowSelected={false}
                                        sortable={false}
                                    />

                                </Container>
                                <div className={classes.bottom}>
                                    <div style={{ width: '100%' }}>
                                        
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <Container className={classes.containerSplit}>
                                    <Table
                                        load={loading}
                                        columns={this.getColumns('In-Progess')}
                                        data={this.filterMenuOrders('In-Progess')}
                                        rowSelected={false}
                                        sortable={false}
                                    />

                                </Container>
                                <div className={classes.bottom}>
                                    <div style={{ width: '100%' }}>
                                        
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <Container className={classes.containerSplit}>
                                    <Table
                                        load={loading}
                                        columns={this.getColumns('Ready')}
                                        data={this.filterMenuOrders('Ready')}
                                        rowSelected={false}
                                        sortable={false}
                                    />

                                </Container>
                                <div className={classes.bottom}>
                                    <div style={{ width: '100%' }}>
                                        
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>  
            </div>
        );
    }
}


ManagerDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    menuOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    onAddOrder: PropTypes.func.isRequired,
    onDeliveryOrder: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(ManagerDashboardContainer(ManagerDashboard)));
