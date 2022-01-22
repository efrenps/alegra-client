import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Components
import NavMenu from './NavMenu';

// Material UI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Drawer, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, useTheme } from '@material-ui/core/styles';
import LayoutStyles from '../../styles/layout';

const styles = (theme) => LayoutStyles.baseLayout(theme);

const BaseLayout = (props) => {
    const [variant, setVariant] = useState('persistent');
    const [open, setOpen] = useState(false);
    const { classes, children } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const rootClass = isMobile ? classes.rootMobile : classes.root;

    useEffect(() => {
        setOpen(!isMobile);
        if (isMobile) {
            setVariant('temporary');
        } else {
            setVariant('persistent');
        }
    }, [isMobile]);

    return (
        <div className={rootClass}>
            <Drawer
                anchor="left"
                variant={variant}
                open={open}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <NavMenu
                    onSelect={() => {
                        if (isMobile) {
                            setOpen(false);
                        }
                    }}
                />
            </Drawer>

            <main
                className={classes.content}
            >
                {isMobile && (
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                                setOpen(!open);
                            }}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon
                                className={classes.menuIcon}
                            />
                        </IconButton>
                    </Toolbar>
                )}
                {children}
            </main>
        </div>
    );
};

BaseLayout.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(BaseLayout);
