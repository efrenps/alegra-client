export default class Button {
    static getStyle(theme = {}, fade) {
        return ({
            containedInfo: {
                backgroundColor: theme.palette.info.main,
                color: theme.palette.info.contrastText,
                '&:hover': {
                    backgroundColor: theme.palette.info.dark,
                },
                '&:disabled': {
                    backgroundColor: `rgba(${theme.palette.rgb.black}, 0.12)`,
                },
            },
            containedSecondaryInfo: {
                backgroundColor: theme.palette.secondaryInfo.main,
                color: theme.palette.secondaryInfo.contrastText,
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: theme.palette.secondaryInfo.dark,
                    boxShadow: 'none',
                },
            },
            containedWarning: {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                '&:hover': {
                    backgroundColor: theme.palette.warning.dark,
                },
            },
            containedError: {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                '&:hover': {
                    backgroundColor: theme.palette.error.dark,
                },
            },
            containedSuccess: {
                backgroundColor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
                '&:hover': {
                    backgroundColor: theme.palette.success.dark,
                },
            },
            containedWhite: {
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: 'white',
                },
            },
            containedFlat: {
                color: theme.palette.text.stormGray,
                backgroundColor: theme.palette.cancel.main,
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                },
            },
            outlinedInfo: {
                color: theme.palette.info.main,
                border: '1px solid',
                borderColor: theme.palette.info.main,
                '&:hover': {
                    border: '1px solid',
                    borderColor: theme.palette.info.main,
                    backgroundColor: fade(
                        theme.palette.info.main,
                        theme.palette.action.hoverOpacity,
                    ),
                },
            },
            outlinedSecondaryInfo: {
                color: theme.palette.text.secondaryPurpure,
                border: '2px solid',
                borderColor: theme.palette.secondaryInfo.main,
                '&:hover': {
                    border: '2px solid',
                    borderColor: theme.palette.secondaryInfo.main,
                    backgroundColor: fade(
                        theme.palette.secondaryInfo.main,
                        theme.palette.action.hoverOpacity,
                    ),
                },
            },
            outlinedError: {
                color: theme.palette.error.main,
                border: '1px solid',
                borderColor: theme.palette.error.main,
                '&:hover': {
                    border: '1px solid',
                    borderColor: theme.palette.error.main,
                    backgroundColor: fade(
                        theme.palette.error.main,
                        theme.palette.action.hoverOpacity,
                    ),
                },
            },
            outlinedSecondaryError: {
                color: theme.palette.text.secondaryPurpure,
                border: '2px solid',
                borderColor: theme.palette.errorSecondary.main,
                '&:hover': {
                    border: '2px solid',
                    borderColor: theme.palette.errorSecondary.main,
                    backgroundColor: fade(
                        theme.palette.errorSecondary.main,
                        theme.palette.action.hoverOpacity,
                    ),
                },
            },
            textError: {
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
                '&:hover': {
                    borderColor: theme.palette.error.main,
                    backgroundColor: fade(
                        theme.palette.error.main,
                        theme.palette.action.hoverOpacity,
                    ),
                },
            },
            textSuccess: {
                color: theme.palette.success.main,
                borderColor: theme.palette.success.main,
                '&:hover': {
                    borderColor: theme.palette.success.main,
                    backgroundColor: fade(
                        theme.palette.success.main,
                        theme.palette.action.hoverOpacity,
                    ),
                },
            },
        });
    }
}
