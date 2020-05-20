import React from "react";
import clsx from "clsx";
import {Divider, Drawer, IconButton, List, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ListItemLink} from "../../molecules";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import {routes} from "../../../routes";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


export const Menu = ({open, onDrawer}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={onDrawer}>
                    {theme.direction === 'rtl' ? <ChevronRight/> : <ChevronLeft/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                {routes.map((route, index) => {
                    if (route.path === "/login") return false;
                    return (
                        <ListItemLink key={index} {...route}/>
                    )
                })}
            </List>
        </Drawer>
    );
};