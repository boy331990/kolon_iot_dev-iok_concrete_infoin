import React from 'react';
import {Grid} from "@material-ui/core";
import {SiteList} from "../SiteList";
import {useLocalStore, useObserver} from "mobx-react-lite";
import {PlaceList} from "../PlaceList";


export const SitePlaceList = () => {

    const localStore = useLocalStore(() => ({
        siteCode: undefined,
        setValue(name, value) {
            localStore[name] = value;
        },
        get siteCodeData() {
            return localStore.siteCode;
        }
    }));

    return useObserver(() => (
        <Grid container spacing={2}>
            <Grid item container spacing={2}>
                <Grid item xs={6}>
                    <SiteList store={localStore}/>
                </Grid>
                <Grid item xs>
                    {localStore.siteCode && <PlaceList store={localStore}/>}
                </Grid>
            </Grid>
        </Grid>
    ));
};