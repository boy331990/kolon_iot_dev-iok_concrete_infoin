import React from 'react';
import {useLocalStore, useObserver} from "mobx-react-lite";
import {Grid} from "@material-ui/core";
import {DeviceList} from "../DeviceList/DeviceList";
import {HistoryList} from "../HistoryList/HistoryList";


export const DeviceHistory = () => {

    const localStore = useLocalStore(() => ({
        deviceId: undefined,
        setValue(name, value) {
            localStore[name] = value;
        },
        get deviceIdData() {
            return localStore.deviceId;
        }
    }));

    return useObserver(() => (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <DeviceList store={localStore}/>
            </Grid>
            <Grid item xs>
                {localStore.deviceId && <HistoryList store={localStore}/>}
            </Grid>
        </Grid>
    ));
};