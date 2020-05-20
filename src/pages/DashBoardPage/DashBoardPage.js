import React from 'react';
import {Grid} from "@material-ui/core";
import {SiteListBoard} from "./SiteListBoard/SiteListBoard";
import {SiteBoard} from "./SiteBoard/SiteBoard";
import {PlaceListBoard} from "./PlaceListBoard/PlaceListBoard";
import {Observer, useLocalStore} from "mobx-react-lite";


export const DashBoardPage = () => {

    const localStore = useLocalStore(() => ({
        siteCode: undefined
    }));

    const handleOnClick = value => {
        console.log(value);
        localStore.siteCode = value;
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SiteBoard/>
            </Grid>
            <Grid item xs={12}>
                <SiteListBoard onClick={handleOnClick}/>
            </Grid>
            <Grid item xs={12}>
                <Observer>{() => <PlaceListBoard siteCode={localStore.siteCode}/>}</Observer>
            </Grid>
        </Grid>
    );
};