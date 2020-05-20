import React, {useContext} from 'react';
import {useHistory, useRouteMatch} from "react-router-dom";
import defaultAxios from "axios";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AddBox as AddBoxIcon} from "@material-ui/icons";
import {EnhancedTable, SearchInputBar} from "../../../components/molecules";
import {useAxios} from "../../../hooks";
import {StoreContext} from "../../../context";


const useStyles = makeStyles(theme => ({
    content: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}));


const headCells = [
    {id: "deviceId", numeric: false, disablePadding: false, label: "장비 아이디", hide: true, primary: true},
    {id: "model.manufacturer.name", numeric: false, disablePadding: false, label: "제조사 이름"},
    {id: "model.name", numeric: false, disablePadding: false, label: "모델 이름"},
    {id: "site.name", numeric: false, disablePadding: false, label: "현장 이름"},
    {id: "name", numeric: false, disablePadding: false, label: "제품 이름"},
    {id: "serialNumber", numeric: false, disablePadding: false, label: "제품 고유 번호"},
    {id: "enable", numeric: false, disablePadding: false, label: "상태"},
    {id: "createdDatetime", numeric: false, disablePadding: false, label: "등록날짜"},
];

export const ProductList = () => {
    const classes = useStyles();
    const history = useHistory();
    const {url} = useRouteMatch();
    const {authentication} = useContext(StoreContext);

    const {loading, data, refetch} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/devices"
    });

    const handleClick = (event, name) => {
        if (event.target.type === "checkbox") return;
        console.log(`event : ${event}, name : ${name}`);
        history.push(`${url}/${name}`);
    };

    const handleAdd = () => {
        history.push(`${url}/add`);
    };

    const handleDelete = (selected) => {
        defaultAxios.delete(process.env.REACT_APP_API_GATEWAY + `/devices/${selected[0]}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authentication.accessToken
            }
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                refetch();
            }
        }).catch(reason => {
            console.error(reason);
        });
    };

    return (
        <>
            <Grid container justify={"space-between"}>
                <SearchInputBar onRefresh={refetch}/>
                <Button variant={"contained"} color={"primary"} className={classes.button} size={"large"} startIcon={<AddBoxIcon/>}
                        onClick={handleAdd}>등록</Button>
            </Grid>
            <div className={classes.content}>
                {loading && 'Loading...'}
                {data && <EnhancedTable title={"제품"} rows={data.data.content} headCells={headCells} rowClick={handleClick} deleteClick={handleDelete}/>}
            </div>
        </>
    );
};