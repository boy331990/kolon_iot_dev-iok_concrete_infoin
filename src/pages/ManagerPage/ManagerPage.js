import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {ManagerDetails, ManagerRegistration} from "./ManagerLayout";
import {ManagerList} from "./ManagerList";


export const ManagerPage = () => {
    return (
        <Switch>
            <Route path={"/manager/add"} exact strict children={<ManagerRegistration/>}/>
            <Route path={"/manager/:id"} exact strict children={<ManagerDetails/>}/>
            <Route path={"/manager"} exact children={<ManagerList/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};