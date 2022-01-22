/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

// Components and Others
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import KitchenDashboardContainer from './containers/KitchenDashboardContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    Container
} from 'react-bootstrap';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DashboardStyles from '../styles/DashboardStyles';
import { Table } from './Table';

const styles = (theme) => DashboardStyles.listStyles(theme);

class KitchenDashboard extends Component {
    constructor(props) {
        super(props);
    }

    getColumns(headerName) {
        const {
            props: {
                classes, onSortMeal,
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
                Header: headerName,
                id: 'menuOrderId',
                accessor: 'menuOrderId',
                style: columnStyle,
                minWidth: 100,
                Cell: props => {
                    const { original } = props;
                    const { menuOrderId, menu } = original;
                    const isNewOrder = original.status === 'pending';
                    const isCooking = original.status === 'cooking';
                    const hasMenuData = original.status === 'storage' || original.status === 'cooking';

                    return (
                        <Paper className={classes.paper} key={ `key-${menuOrderId}` }>
                            <Card className={classes.rootCard} variant="outlined">
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        { `Order #${menuOrderId}` }
                                    </Typography>
                                    {hasMenuData && (
                                        <Typography variant="body2" component="div">
                                            { menu.name }
                                        </Typography>
                                    )}
                                </CardContent>
                                {isNewOrder && (
                                    <CardActions disableSpacing className={classes.parentFlexCenter}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            className={clsx(classes.smallButton, classes.blueButton)}
                                            onClick={() => onSortMeal(menuOrderId)}
                                        >
                                            Sort Meal
                                        </Button>
                                    </CardActions>
                                )}
                                {isCooking && (
                                    <CardActions disableSpacing className={classes.parentFlexCenter}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            className={clsx(classes.smallButton, classes.blueButton)}
                                            // onClick={() => onSortMeal()}
                                        >
                                            Done
                                        </Button>
                                    </CardActions>
                                )}
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
            filter = (element) => (element.status === 'storage');
        } else if (stage === 'Ready') {
            filter = (element) => element.status === 'cooking';
        } 

        return menuOrders.filter(filter);
    }

    getClassName (menuId) {
        const {
            props: {
                selectedMenuId, classes
            },
        } = this;

        return (menuId &&  menuId === selectedMenuId) ? classes.paperSelected : classes.paper;
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
                classes, menus, loading
            },
        } = this;

        return (
            <div className={classes.root}>
                <Grid container className={classes.topSpace} spacing={1}>
                        {menus.map((menu, index) => (
                            <Grid item xs>
                                <Paper className={this.getClassName(menu.menuId)}>
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
                <Grid container spacing={3}>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <Container className={classes.containerSplitKitchen}>
                                    <Table
                                        load={loading}
                                        columns={this.getColumns('New Orders')}
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
                                <Container className={classes.containerSplitKitchen}>
                                    <Table
                                        load={loading}
                                        columns={this.getColumns('Waiting for Ingredients')}
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
                                <Container className={classes.containerSplitKitchen}>
                                    <Table
                                        load={loading}
                                        columns={this.getColumns('Cooking')}
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


KitchenDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    menuOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    selectedMenuId: PropTypes.number,
    onSortMeal: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(KitchenDashboardContainer(KitchenDashboard)));
