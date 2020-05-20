import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {EnhancedTableWithoutCheckbox} from "../../../components/molecules";
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
    {id: "code", numeric: false, disablePadding: false, label: "현장코드"},
    {id: "code", numeric: false, disablePadding: false, label: "현장코드", hide: true, primary: true},
    {id: "name", numeric: false, disablePadding: false, label: "현장명"},
];

export const SiteList = props => {
    const classes = useStyles();
    const {store} = props;

    const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/sites"
    });

    const handleClick = name => {
        store.setValue("siteCode", name);
    };

    return (
        <div className={classes.content}>
            {loading && 'Loading...'}
            {data && <EnhancedTableWithoutCheckbox title={"장소관리 - 현장 선택"} rows={data.data.content} headCells={headCells} dense rowClick={handleClick}/>}
        </div>
    );
};