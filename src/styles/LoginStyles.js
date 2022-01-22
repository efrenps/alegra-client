export default class LoginStyles {
    static login(theme = {}) {
        return ({
            loginContainer: {
                padding: '20px',
                width: '100%',
                maxWidth: '420px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                background: theme.palette.background.outerSpace,
                '& > div:first-child': {
                    flex: 'auto',
                },
                '& .login-content': {
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 5px',
                    maxWidth: '100%',
                    margin: '0 auto',
                    '-webkit-box-flex': 1,
                    '-ms-flex': 'auto',
                    flex: 'auto',
                    height: '100%',
                    justifyContent: 'center',
                    '& .logo-container': {
                        width: '300px',
                        padding: '0 35px',
                        paddingBottom: '12px',
                        '& .img': {
                            width: '120%',
                        },
                    },
                    '& .form-group': {
                        marginBottom: '5px',
                    },
                    '& .form-label': {
                        fontSize: '14px',
                        color: theme.palette.text.white,
                    },
                    '& .form-control': {
                        fontSize: '14px',
                    },

                    '& .btn': {
                        marginTop: '15px',
                        fontSize: '14px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 'unset',
                        height: '32px',

                        '&.btn-primary': {
                            backgroundColor: theme.palette.background.dodgerBlue,
                            borderColor: theme.palette.background.dodgerBlue,
                        },
                        '& .icon': {
                            marginLeft: '8px',
                        },
                    },
                },
                '& .login-footer': {
                    '-webkit-box-flex': 0,
                    '-ms-flex': '0 0 auto',
                    flex: '0 0 auto',
                    padding: '19px 40px',
                    color: theme.palette.text.white,
                    fontSize: '13.5px',
                },
            },
        });
    }
}
