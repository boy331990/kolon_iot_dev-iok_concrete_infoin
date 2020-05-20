import React from 'react';
import {useHistory, useRouteMatch} from "react-router-dom";
import defaultAxios from "axios";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {PersonAdd as PersonAddIcon} from "@material-ui/icons";
import {EnhancedTable, SearchInputBar} from "../../../components/molecules";
import {useAxios} from "../../../hooks";


const useStyles = makeStyles(theme => ({
    content: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}));


const headCells = [
    {
        id: "customer.name",
        numeric: false,
        disablePadding: false,
        label: "고객사명"
    },
    {id: "site.name", numeric: false, disablePadding: false, label: "현장명"},
    {id: "place.name", numeric: false, disablePadding: false, label: "장소명"},
    {id: "userFullName", numeric: false, disablePadding: false, label: "사용자명"},
    {id: "username", numeric: false, disablePadding: false, label: "이메일", hide: true, primary: true},
    {id: "enable", numeric: false, disablePadding: false, label: "사용 유무"}
];

export const ManagerList = () => {
    const classes = useStyles();
    const history = useHistory();
    const {url} = useRouteMatch();

    const {loading, data, refetch} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/users?authorities=ROLE_MANAGER"
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
        defaultAxios.delete(process.env.REACT_APP_API_GATEWAY + `/users/${selected[0]}`).then(response => {
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
                <Button variant={"contained"} color={"primary"} className={classes.button} size={"large"} startIcon={<PersonAddIcon/>}
                        onClick={handleAdd}>등록</Button>
            </Grid>
            <div className={classes.content}>
                {loading && 'Loading...'}
                {data && <EnhancedTable title={"운영자"} rows={data.data.content} headCells={headCells} rowClick={handleClick} deleteClick={handleDelete}/>}
            </div>
        </>
    );
};