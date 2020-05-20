import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {DeviceProfileLayout} from "./DeviceProfileLayout/DeviceProfileLayout";


export const DeviceProfilePage = () => {
    return (
        <Switch>
            <Route path={"/device/profile"} exact strict children={<DeviceProfileLayout/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};