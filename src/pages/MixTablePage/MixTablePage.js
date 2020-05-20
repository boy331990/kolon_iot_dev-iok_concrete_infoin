import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {MixTable} from "./MixTable";


export const MixTablePage = () => {
    return (
        <Switch>
            <Route path={"/mix-table"} children={<MixTable/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};