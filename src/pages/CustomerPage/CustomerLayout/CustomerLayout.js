import React, {useContext} from 'react';
import {Button, CardActions, CardContent, CardHeader, Divider, Grid, Paper} from '@material-ui/core';
import {EnhancedPasswordInput, EnhancedRadioByEnable, EnhancedTextField, SelectCustomers} from "../../../components/molecules";
import {useLocalStore, useObserver} from "mobx-react-lite";
import {toJS} from "mobx";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {useAxios} from "../../../hooks";
import defaultAxios from "axios";
import {StoreContext} from "../../../context";


const Details = props => {
    const {data} = props;
    const history = useHistory();
    const {id} = useParams();
    const match = useRouteMatch("/customer/add");
    const {authentication} = useContext(StoreContext);

    console.log(data);

    const localStore = useLocalStore(() => ({
        authorities: ['ROLE_CUSTOMER'],
        customer: {
            customerCode: data && data.data.customer.customerCode
        },
        customerCode: data && data.data.customer.customerCode,
        site: data && data.data.site,
        username: data && data.data.username,
        password: data && data.data.password,
        userFullName: data && data.data.userFullName,
        enable: 'true',
        setValue(name, value) {
            localStore[name] = value;
        }
    }));

    const handleSubmit = event => {
        event.preventDefault();

        const options = {
            url: process.env.REACT_APP_API_GATEWAY + (match ? "/users" : `/users/${id}`),
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
            history.push("/customer");
        }).catch(reason => {
            console.error(reason);
        });

    };

    const handleCancel = () => history.replace({pathname: "/customer"});

    return useObserver(() => (
        <Paper>
            <form autoComplete={"off"} noValidate onSubmit={handleSubmit}>
                <CardHeader title="회원관리"/>
                <Divider/>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12}>
                            <SelectCustomers store={localStore} required/>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"이름"}
                                name={"userFullName"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"이메일"}
                                name={"username"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedTextField
                                variant={"outlined"}
                                margin={"dense"}
                                label={"연락처"}
                                name={"phone"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedPasswordInput
                                variant={"outlined"}
                                margin={"dense"}
                                label={"비밀번호"}
                                name={"password"}
                                store={localStore}
                                required
                                autoComplete={"new-password"}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <EnhancedPasswordInput
                                variant={"outlined"}
                                margin={"dense"}
                                label={"비밀번호 확인"}
                                name={"passwordConfirm"}
                                store={localStore}
                                required
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
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


export const CustomerDetails = () => {
    const {id} = useParams();
    const {loading, data, submit} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/users/${id}`
    });

    return (
        <>
            {!loading && <Details data={data} submit={submit}/>}
        </>
    )
};

export const CustomerRegistration = () => {
    return (<Details/>)
};