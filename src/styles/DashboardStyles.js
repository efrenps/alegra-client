export default class DasboardStyles {
    static listStyles(theme = {}) {
        return ({
            root: {
                flexGrow: 1,
            },
            bottom: {
                flexGrow: 1,
            },
            rootDiv: {
                marginTop: '50px',
                flexGrow: 1,
            },
            topSpace: {
                marginTop: '25px',
            },
            rootCard: {
                minWidth: 200,
            },
            bullet: {
                display: 'inline-block',
                margin: '0 2px',
                transform: 'scale(0.8)',
            },
            title: {
                fontSize: 14,
            },
            pos: {
                marginBottom: 12,
            },
            paper: {
                padding: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
            paperSelected: {
                padding: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.background.forestGreen,
            },
            header: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: theme.spacing(1),
            },
            bottomTableHeight: {
                height: 'calc(100vh * 0.9 - 100px)',
            },
            button: {
                color: theme.palette.text.white,
                width: '150px',
                padding: '10px',
                marginRight: '16px',
            },
            smallButton: {
                color: theme.palette.text.white,
                width: '100px',
                padding: '5px 10px 5px 10px'
            },
            greenButton: {
                backgroundColor: theme.palette.background.eucalyptus,
                '&:hover': {
                    backgroundColor: theme.palette.background.forestGreen,
                },
            },
            parentFlexCenter: {
                display: "flex",
                justifyContent: "center"
            },
            blueButton: {
                backgroundColor: '#59A9FF',
                '&:hover': {
                    backgroundColor: '#4D91DB',
                },
            },
            removeButton: {
                backgroundColor: '#E97C87',
                '&:hover': {
                    backgroundColor: '#D6727C',
                },
            },
            content: {
                height: '100%',
                flex: 1,
                overflow: 'hidden',
            },
            columnStyle: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            columnLeftStyle: {
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
            },
            columnRightStyle: {
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'right',
            },
            search: {
                marginRight: theme.spacing(2),
                width: 300,
            },
            checkedGreen: {
                color: theme.palette.success.main,
            },
            containerSplit: {
                flexDirection: 'column',
                padding: '0px',
                height: '450px',
            },
            containerSplitKitchen: {
                flexDirection: 'column',
                padding: '0px',
                height: '550px',
            },
        });
    }
}
