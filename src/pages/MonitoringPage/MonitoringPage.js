import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {StateList} from "./StateList";
import {NodeDetail} from "./NodeDetail";


export const MonitoringPage = () => {


    return (
        <Switch>
            <Route path={"/monitoring"} exact children={<StateList/>}/>
            <Route path={"/monitoring/detail"} exact children={<NodeDetail/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};