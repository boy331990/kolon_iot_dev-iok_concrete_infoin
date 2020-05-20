import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {CustomerDetails, CustomerRegistration} from "./CustomerLayout";
import {CustomerList} from "./CustomerList";

export const CustomerPage = () => {
    return (
        <Switch>
            <Route path={"/customer/add"} exact strict children={<CustomerRegistration/>}/>
            <Route path={"/customer/:id"} exact strict children={<CustomerDetails/>}/>
            <Route path={"/customer"} exact children={<CustomerList/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};