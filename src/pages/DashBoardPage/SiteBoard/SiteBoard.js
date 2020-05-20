import React from 'react'
import Grid from "@material-ui/core/Grid";
import {SiteCard} from "./SiteCard";
import {DevicesCard} from "./DevicesCard";
import {WeatherCard} from "./WeatherCard";


export const SiteBoard = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <SiteCard/>
            </Grid>
            <Grid item xs>
                <DevicesCard/>
            </Grid>
            <Grid item xs={7}>
                <WeatherCard/>
            </Grid>
        </Grid>
    );
};