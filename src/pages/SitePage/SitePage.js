import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {SiteDetails, SiteRegistration} from "./SiteLayout";
import {SiteList} from "./SiteList";


export const SitePage = () => {
    return (
        <Switch>
            <Route path={"/site/add"} exact strict children={<SiteRegistration/>}/>
            <Route path={"/site/:id"} exact strict children={<SiteDetails/>}/>
            <Route path={"/site"} exact children={<SiteList/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};