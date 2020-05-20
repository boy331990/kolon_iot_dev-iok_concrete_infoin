import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {StoreContext} from "../../../context";


export const PrivateRoute = ({children, ...rest}) => {
    const {authentication} = useContext(StoreContext);

    return (
        <Route
            {...rest}
            render={({location}) =>
                authentication.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    )
};