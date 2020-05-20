import React from 'react';
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 240;

const fontFamily = ['"Roboto"', '"Noto Sans KR"', '"Helvetica"', '"Arial"', 'sans-serif'].join(',');

const theme = createMuiTheme({
    overrides: {
        MuiTypography: {
            body1: {
                fontFamily: fontFamily
            },
            h6: {
                fontFamily: fontFamily
            }
        },
        MuiTableCell: {
            root: {
                fontFamily: fontFamily
            }
        },
        MuiTab: {
            root: {
                fontFamily: fontFamily
            }
        }
    }
});

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3, 3, 10, 3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}));

export const PageTemplate = ({header, menu, children, footer}) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline/>
                {header}
                {menu}
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {children}
                </main>
                {footer}
            </div>
        </ThemeProvider>
    );
};