import React from 'react';
import {useHistory, useRouteMatch} from "react-router-dom";
import defaultAxios from "axios";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AddBox as AddBoxIcon} from "@material-ui/icons";
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
    {id: "customer.name", numeric: false, disablePadding: false, label: "고객사명"},
    {id: "code", numeric: false, disablePadding: false, label: "현장코드", hide: true, primary: true},
    {id: "name", numeric: false, disablePadding: false, label: "현장명"},
    {id: "address", numeric: false, disablePadding: false, label: "주소"},
    {id: "enable", numeric: false, disablePadding: false, label: "사용 유무"}
];

export const SiteList = () => {
    const classes = useStyles();
    const history = useHistory();
    const {url} = useRouteMatch();

    const {loading, data, refetch} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/sites"
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
        defaultAxios.delete(process.env.REACT_APP_API_GATEWAY + `/sites/${selected[0]}`).then(response => {
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
                {data && <EnhancedTable title={"현장"} rows={data.data.content} headCells={headCells} rowClick={handleClick} deleteClick={handleDelete}/>}
            </div>
        </>
    );
};