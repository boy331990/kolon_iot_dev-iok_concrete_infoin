import React, {useContext} from 'react';
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {toJS} from "mobx";
import {useLocalStore, useObserver} from "mobx-react-lite";
import defaultAxios from "axios";
import {Button, CardActions, CardContent, CardHeader, Divider, Grid, Paper} from '@material-ui/core';
import {EnhancedRadioByEnable, EnhancedTextField, SelectCustomers} from "../../../components/molecules";
import {useAxios} from "../../../hooks";
import {StoreContext} from "../../../context";


const Details = props => {
    const {data} = props;
    const history = useHistory();
    const {id} = useParams();
    const match = useRouteMatch("/site/add");
    const {authentication} = useContext(StoreContext);

    const localStore = useLocalStore(() => ({
        code: data && data.data.code,
        name: data && data.data.name,
        customerCode: data && data.data.customer.customerCode,
        address: data && data.data.address,
        detailAddress: data && data.data.detailAddress,
        enable: 'true',
        setValue(name, value) {
            localStore[name] = value;
        }
    }));

    const handleSubmit = event => {
        event.preventDefault();

        const options = {
            url: process.env.REACT_APP_API_GATEWAY + (match ? "/sites" : `/sites/${id}`),
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
            history.push("/site");
        }).catch(reason => {
            console.error(reason);
        });

    };

    const handleCancel = () => history.replace({pathname: "/site"});

    return useObserver(() => (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <CardHeader title="현장 관리"/>
                <Divider/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <SelectCustomers store={localStore} required/>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"현장코드"}
                                name={"code"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"현장명"}
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

export const SiteDetails = () => {
    const {id} = useParams();
    const {loading, data, submit} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/sites/${id}`
    });

    return (
        <>
            {!loading && <Details data={data} submit={submit}/>}
        </>
    )
};

export const SiteRegistration = () => {
    return (<Details/>)
};