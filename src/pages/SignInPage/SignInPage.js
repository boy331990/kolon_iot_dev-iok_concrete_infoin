import React, {useContext} from 'react';
import defaultAxios from "axios";
import {toJS} from "mobx";
import {useLocalStore} from "mobx-react-lite";
import {useHistory, useLocation} from "react-router-dom";
import {StoreContext} from "../../context";
import {Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Copyright, EnhancedPasswordInput, EnhancedTextField} from "../../components/molecules";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SignInPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const localStore = useLocalStore(() => ({
        email: '',
        password: '',
        setValue(name, value) {
            localStore[name] = value;
        }
    }));
    const {toggleAuthentication} = useContext(StoreContext);

    const {from} = location.state || {from: {pathname: "/"}};

    const handleSignIn = () => {
        const loginData = toJS(localStore);
        defaultAxios.post(process.env.REACT_APP_API_GATEWAY + "/oauth/token", null, {
            headers: {
                Authorization: "Basic S09MT05fVEVTVDozMDY1MjEyZWFiOWM2NjRlYTIwNDhiZGUzZDM4ODhiNQ=="
            },
            params: {
                username: loginData.email,
                password: loginData.password,
                grant_type: "password",
                scope: "write"
            }
        }).then(response => {
            toggleAuthentication(true, response.data.access_token);
            history.replace(from);
        });

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <EnhancedTextField
                        variant={"outlined"}
                        margin={"normal"}
                        label={"Email Address"}
                        name={"email"}
                        store={localStore}
                        autoComplete={"email"}
                        required
                    />
                    <EnhancedPasswordInput
                        margin={"normal"}
                        label={"Password"}
                        name={"password"}
                        store={localStore}
                        autoComplete={"current-password"}
                        required
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>

                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}