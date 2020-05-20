import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {SettingDetails, SettingRegistration} from "./SettingLayout";


export const SiteSettingPage = () => {
    return (
        <Switch>
            <Route path={"/site/setting/add"} exact strict children={<SettingRegistration/>}/>
            <Route path={"/site/setting/details"} exact strict children={<SettingDetails/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};