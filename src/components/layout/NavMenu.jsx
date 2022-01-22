import React, { Component } from 'react';

// Material UI
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
    PowerSettingsNew as PowerSettingsNewIcon,
    DashboardOutlined as DashboardIcon,
} from '@material-ui/icons';

// Component and Others
import PropTypes from 'prop-types';
import avatarUser from '../../assets/userDefault.jpg';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
  
import KeyStore from '../../utils/KeyStore';
import Permissions from '../../utils/Permissions';
import LayoutStyles from '../../styles/layout';
import client from '../../services/apollo/ApolloClient';

const styles = (theme) => LayoutStyles.navMenu(theme);

const keyStore = new KeyStore();
class NavMenu extends Component {
    getNavigationByPermission() {
        const { classes } = this.props;
        const modules = [];
        
        if (keyStore.hasPermission(Permissions.MANAGER)) {
            modules.push(
                {
                    text: 'Dashboard',
                    to: '/manager-dashboard',
                    icon: <DashboardIcon className={classes.iconSize} title="Dashboard" />,
                },
            );
        }
        if (keyStore.hasPermission(Permissions.MANAGER) || keyStore.hasPermission(Permissions.KITCHEN)) {
            modules.push(
                {
                    text: 'Dashboard',
                    to: '/kitchen-dashboard',
                    icon: <DashboardIcon className={classes.iconSize} title="Dashboard" />,
                },
            );
        }
        if (keyStore.hasPermission(Permissions.MANAGER) || keyStore.hasPermission(Permissions.FOOD_STORAGE)) {
            modules.push(
                {
                    text: 'Dashboard',
                    to: '/storage-dashboard',
                    icon: <DashboardIcon className={classes.iconSize} title="Dashboard" />,
                },
            );
        }


        return modules;
    }

    getBottomNavigation() {
        const { classes } = this.props;
        
        return (
            <div className={classes.navigationBottom}>
                <ListItem button className={classes.listItem}>
                    <ListItemIcon color="inherit" className={classes.icon} onClick={() => this.logOut()}>
                        <PowerSettingsNewIcon title="Logout" />
                    </ListItemIcon>
                </ListItem>
            </div>
        );
    }

    logOut() {
        const { props: { history } } = this;
        client.resetStore();
        new KeyStore().clear();
        history.push('/login');
    }

    render() {
        const { props: { classes, onSelect } } = this;
        const navigation = this.getNavigationByPermission();
        const bottonNavigation = this.getBottomNavigation();
        
        return (
            <>
                <Avatar
                    alt={keyStore.getUsername()}
                    src={avatarUser}
                    className={classes.large}
                    component={NavLink}
                    to="#"
                />
                <List className={classes.list}>
                    <div className={classes.navigationTop}>
                        {navigation.map((item) => (
                            <ListItem
                                onClick={() => {
                                    onSelect();
                                }}
                                button
                                key={item.to}
                                className={classes.listItem}
                                activeClassName={classes.activeListItem}
                                to={item.to}
                                component={NavLink}
                            >
                                <ListItemIcon color="inherit" className={classes.icon}>{item.icon}</ListItemIcon>
                            </ListItem>
                        ))}
                    </div>
                    {bottonNavigation}
                </List>
            </>
        );
    }
}

NavMenu.propTypes = {
    onSelect: PropTypes.func.isRequired,
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavMenu));
