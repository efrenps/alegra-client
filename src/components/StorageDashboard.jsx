/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

// Components and Others
import clsx from 'clsx';
import PropTypes, { array } from 'prop-types';
import { withRouter } from 'react-router-dom';
import StorageDashboardContainer from './containers/StorageDashboardContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    Container
} from 'react-bootstrap';

// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DashboardStyles from '../styles/DashboardStyles';
import { Table } from './Table';

const styles = (theme) => DashboardStyles.listStyles(theme);

class StorageDashboard extends Component {
    constructor(props) {
        super(props);
    }

    getMenuRecord(menuId) {
        const {
            props: {
                menus
            },
        } = this;
        return menus.find(element =>  element.menuId === menuId)
    }

    getColumns() {
        const {
            props: {
                classes, onSortMeal, onUpdateOrderStatus
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
                Header: 'Orders',
                id: 'menuOrderId',
                accessor: 'menuOrderId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    const { menuOrderId, menuId } = original;
                    const menu = this.getMenuRecord(menuId);

                    return (
                        <Paper className={classes.paper} key={ `key-${menuOrderId}` }>
                            <Typography variant="h4" component="div">
                                { `#${menuOrderId} - ${menu.name}` }
                            </Typography>
                        </Paper>        
                    );
                },
            },
            {
                Header: 'Ingredients',
                id: 'menuOrderId',
                accessor: 'menuOrderId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    const { menuOrderId, menuId } = original;
                    const menu = this.getMenuRecord(menuId);
                    const ingredients = this.renderMenuIngredients(menu);

                    return (
                        <Typography variant="body1" component="div">
                                { ingredients }
                        </Typography>      
                    );
                },
            },
            {
                Header: '',
                id: 'menuOrderId',
                accessor: 'menuOrderId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    const { menuOrderId } = original;

                    return (
                        <Button
                                size="small"
                                variant="contained"
                                className={clsx(classes.smallButton, classes.blueButton)}
                                onClick={() => onUpdateOrderStatus(menuOrderId)}
                                >
                                    Deliver
                        </Button>   
                    );
                },
            },
        ];

        return columns;
    }

    getClassName (menuId) {
        const {
            props: {
                selectedMenuId, classes
            },
        } = this;

        return (menuId &&  menuId === selectedMenuId) ? classes.paperSelected : classes.paper;
    }

    renderMenuIngredients (menu) {
        const ingredients = [];
        menu.ingredients.forEach(ingredient => {
            ingredients.push(`${ingredient.name}(${ingredient.quantity})`);
        });
        return ingredients.join(', ');
    }

    renderIngredients () {
        const {
            props: {
                classes, ingredients,
            },
        } = this;

        return (
            ingredients.map((ingredient) => (
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    { ingredient.name }
                                    
                                </Typography>
                                <Typography variant="body1" component="div">
                                    { `Stock: ${ingredient.quantity}` }
                                </Typography>
                                <div>
                                    <IconButton 
                                        color="primary" 
                                        aria-label="buy more"
                                    >
                                        <ShoppingCartIcon />
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            ))
        );
    }

    render() {
        const {
            props: {
                classes, loading, menuOrders
            },
        } = this;

        const filteredRecords = menuOrders.filter(record => record.status === 'storage');

        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                        { this.renderIngredients() }
                </Grid>
                <Grid container className={classes.topSpace} spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Container className={classes.containerSplitKitchen}>
                                <Table
                                    load={loading}
                                    columns={this.getColumns()}
                                    data={filteredRecords}
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


StorageDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    menuOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    selectedMenuId: PropTypes.number,
    onSortMeal: PropTypes.func.isRequired,
    onUpdateOrderStatus: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(StorageDashboardContainer(StorageDashboard)));
