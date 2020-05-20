import React from 'react';
import Grid from "@material-ui/core/Grid";
import {NodeInformation} from "./NodeInfomation/NodeInformation";
import {NodeChart} from "./NodeChart/NodeChart";
import {NodeTable} from "./NodeTable/NodeTable";
import {useLocation} from "react-router-dom";
import {useAxios} from "../../../hooks";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


export const NodeDetail = () => {
    const queryString = useQuery();
    const siteCode = queryString.get("siteCode");
    const placeCode = queryString.get("placeCode");
    const deviceId = queryString.get("deviceId");

    const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_CONCRETE + `/concrete/devices/${deviceId}/statistics`
    })

    return (
        <Grid container direction={"column"} spacing={3}>
            <Grid item xs>
                <NodeInformation siteCode={siteCode} placeCode={placeCode}/>
            </Grid>
            <Grid item xs>
                <NodeChart data={data && data.data.content}/>
            </Grid>
            <Grid item xs>
                <NodeTable data={data && data.data.content}/>
            </Grid>
        </Grid>
    );
};