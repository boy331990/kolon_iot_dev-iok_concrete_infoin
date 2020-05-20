import React, {useContext} from 'react';
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {toJS} from "mobx";
import {useLocalStore, useObserver} from "mobx-react-lite";
import defaultAxios from "axios";
import {Button, CardActions, CardContent, CardHeader, Divider, Grid, Paper} from '@material-ui/core';
import {EnhancedRadioByEnable, EnhancedTextField, SelectSites} from "../../../components/molecules";
import {useAxios} from "../../../hooks";
import {StoreContext} from "../../../context";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Details = props => {
    const {data} = props;
    const history = useHistory();
    const match = useRouteMatch("/site/place/add");
    const query = useQuery();
    const {authentication} = useContext(StoreContext);

    const localStore = useLocalStore(() => ({
        siteCode: query.get("siteCode"),
        name: data && data.data.name,
        address: data && data.data.address,
        detailAddress: data && data.data.detailAddress,
        enable: 'true',
        setValue(name, value) {
            localStore[name] = value;
        },
        get siteCodeData() {
            return localStore.siteCode;
        }
    }));

    const handleSubmit = event => {
        event.preventDefault();

        const options = {
            url: process.env.REACT_APP_API_GATEWAY + (match ? `/sites/${query.get("siteCode")}/places` : `/sites/${query.get("siteCode")}/places/${query.get("placeCode")}`),
            method: match ? 'post' : 'put',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authentication.accessToken
            },
            data: toJS(localStore)
        };

        defaultAxios(options).then(response => {
            console.log(response);
            if (response.status === 200) {
                // Modify
            } else if (response.status === 201) {
                // Save
            }
            history.push("/site/place");
        }).catch(reason => {
            console.error(reason);
        });

    };

    const handleCancel = () => history.replace({pathname: "/site/place"});

    const handleOnChangeForSite = (name, value) => {
        localStore.setValue(name, value);
    };

    return useObserver(() => (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <CardHeader title="장소 관리"/>
                <Divider/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <SelectSites defaultValue={localStore.siteCodeData} onChange={handleOnChangeForSite} required/>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"장소명"}
                                name={"name"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Grid container spacing={2} alignItems={"center"}>
                                <Grid item md={8} xs={12}>
                                    <EnhancedTextField
                                        variant={"outlined"}
                                        margin={"dense"}
                                        label={"주소"}
                                        name={"address"}
                                        store={localStore}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Button fullWidth variant={"outlined"}>주소검색</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"상세주소"}
                                name={"detailAddress"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <EnhancedRadioByEnable
                                label={"사용여부"}
                                store={localStore}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button type={"submit"} variant={"contained"} color={"primary"}>저장</Button>
                    <Button type={"button"} variant={"contained"} onClick={handleCancel}>취소</Button>
                </CardActions>
            </form>
        </Paper>
    ));
};

export const PlaceDetails = () => {
    const query = useQuery();
    const {loading, data, submit} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/sites/${query.get("siteCode")}/places/${query.get("placeCode")}`
    });

    return (
        <>
            {!loading && <Details data={data} submit={submit}/>}
        </>
    )
};

export const PlaceRegistration = () => {
    return (<Details/>)
};