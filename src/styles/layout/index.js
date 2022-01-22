const drawerWidth = 76;

export default class LayoutStyles {
    static navMenu(theme = {}) {
        return ({
            large: {
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(6),
                width: '38px',
                height: '38px',
            },
            icon: {
                color: '#fff',
                display: 'block',
            },
            list: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-between',
            },
            listItem: {
                textAlign: 'center',
            },
            activeListItem: {
                backgroundColor: theme.palette.background.white,
                '&:hover': {
                    backgroundColor: theme.palette.background.white,
                },
                '& > div': {
                    color: theme.palette.primary.main,
                    '& > svg > g > g > *': {
                        stroke: theme.palette.primary.main,
                    },
                },
            },
            iconSize: {
                fontSize: '1.8rem',
            },
            navigationTop: {
                flexGrow: 0,
                maxHeight: '70vh',
                overflow: 'auto',
            },
            navigationBottom: {
                flexShrink: 0,
            },
        });
    }

    static baseLayout(theme = {}) {
        return ({
            root: {
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            },
            rootMobile: {
                overflow: 'hidden',
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
            },
            drawerPaper: {
                width: drawerWidth,
                backgroundColor: theme.palette.primary.main,
                alignItems: 'center',
                overflow: 'hidden',
            },
            content: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
            },
            menuIcon: {
                color: theme.palette.text.purplelight,
            },
        });
    }
}
