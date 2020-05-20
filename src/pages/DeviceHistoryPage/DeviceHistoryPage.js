import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {DeviceHistory} from "./DeviceHistoty/DeviceHistory";


export const DeviceHistoryPage = () => {
    return (
        <Switch>
            <Route path={"/device/history"} exact children={<DeviceHistory/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};