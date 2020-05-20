import React, {useContext} from 'react';
import clsx from 'clsx';
import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import {AccountCircle, Brightness4, ExpandMore as ExpandMoreIcon, Menu as MenuIcon, Translate as TranslateIcon} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {StoreContext} from "../../../context";
import {useHistory} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
}));


export const Header = ({open, onDrawer}) => {
    const classes = useStyles();
    const {authentication, toggleAuthentication} = useContext(StoreContext);
    const history = useHistory();

    const [auth, setAuth] = React.useState(authentication.isAuthenticated);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [translate, setTranslate] = React.useState(null);
    const user = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTranslateMenu = event => {
        setTranslate(event.currentTarget);
    };

    const handleTranslateClose = () => {
        setTranslate(null);
    };

    const handleChange = event => {
        setAuth(true);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        setAuth(false);
        toggleAuthentication(false, "");
        history.replace("/login");
    };

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawer}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    Curing of Concrete
                </Typography>
                {auth ?
                    (<div>
                        <Button aria-controls="simple-menu"
                                aria-haspopup="true"
                                startIcon={<TranslateIcon/>}
                                endIcon={<ExpandMoreIcon/>}
                                onClick={handleTranslateMenu}
                                color={"inherit"}
                        >
                            Language
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={translate}
                            keepMounted
                            open={Boolean(translate)}
                            onClose={handleTranslateClose}
                        >
                            <MenuItem onClick={handleTranslateClose}>English</MenuItem>
                            <MenuItem onClick={handleTranslateClose}>한국어</MenuItem>
                        </Menu>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Brightness4/>
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={user}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>) : (<Button color="inherit" onClick={handleChange}>Login</Button>)
                }
            </Toolbar>
        </AppBar>
    );
};