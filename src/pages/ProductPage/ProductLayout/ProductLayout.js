import React, {useContext} from 'react';
import {Button, CardActions, CardContent, CardHeader, Divider, Grid, Paper} from '@material-ui/core';
import {EnhancedTextField, SelectManufacturerModels, SelectManufacturers} from "../../../components/molecules";
import {useAxios} from "../../../hooks";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {StoreContext} from "../../../context";
import {useLocalStore, useObserver} from "mobx-react-lite";
import {toJS} from "mobx";
import defaultAxios from "axios";


const Details = props => {
    const {data} = props;
    const history = useHistory();
    const {id} = useParams();
    const match = useRouteMatch("/products/add");
    const {authentication} = useContext(StoreContext);
    const localStore = useLocalStore(() => ({
        deviceId: data && data.deviceId,
        name: data && data.name,
        manufacturerCode: data && data.model.manufacturer.code,
        manufacturerModelCode: data && data.model.code,
        model: {
            manufacturer: {
                code: data && data.model.manufacturer.code
            },
            code: data && data.model.code,
        },
        serialNumber: data && data.serialNumber,
        setValue(name, value) {
            localStore[name] = value;
        }
    }));

    const handleSubmit = event => {
        event.preventDefault();

        const options = {
            url: process.env.REACT_APP_API_GATEWAY + (match ? "/devices" : `/devices/${id}`),
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
            history.push("/products");
        }).catch(reason => {
            console.error(reason);
        });

    };

    const handleOnChangeForManufacturer = (name, value) => {
        localStore.manufacturerCode = value;
        localStore.model.manufacturer.code = value;
    };

    const handleOnChangeForModel = (name, value) => {
        localStore.manufacturerModelCode = value;
        localStore.model.code = value;
    };

    const handleCancel = () => history.replace({pathname: "/products"});

    return useObserver(() => (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <CardHeader title="제품 관리"/>
                <Divider/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"제품 아이디"}
                                name={"deviceId"}
                                store={localStore}
                                disabled
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <SelectManufacturers defaultValue={localStore.manufacturerCode} required onChange={handleOnChangeForManufacturer}/>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <SelectManufacturerModels defaultValue={localStore.manufacturerModelCode} required onChange={handleOnChangeForModel}/>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"제품 이름"}
                                name={"name"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"제품 고유 번호"}
                                name={"serialNumber"}
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
}


export const ProductDetails = () => {
    const {id} = useParams();
    const {loading, data, submit} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/devices/${id}`
    });

    return (
        <>
            {!loading && <Details data={data.data.content} submit={submit}/>}
        </>
    )
};

export const ProductRegistration = () => {
    return (<Details/>)
};