import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Copyright} from "../../molecules";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    footer: {
        bottom: 0,
        position: "fixed",
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]
    },
    appBar: {
        width: '100%',
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
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const StickyFooter = ({open}) => {
    const classes = useStyles();
    return (
        <footer className={clsx(classes.footer, {
            [classes.appBarShift]: open,
            [classes.appBar]: !open
        })}
        >
            <Copyright/>
        </footer>
    );
};