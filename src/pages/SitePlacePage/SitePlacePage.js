import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {SitePlaceList} from "./SitePlaceList/SitePlaceList";
import {PlaceDetails, PlaceRegistration} from "./PlaceLayout/PlaceLayout";


export const SitePlacePage = () => {
    return (
        <Switch>
            <Route path={"/site/place/add"} exact strict children={<PlaceRegistration/>}/>
            <Route path={"/site/place/details"} children={<PlaceDetails/>}/>
            <Route path={"/site/place"} exact children={<SitePlaceList/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};