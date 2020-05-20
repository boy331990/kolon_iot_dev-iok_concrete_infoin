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
    {id: "deviceId", numeric: false, disablePadding: false, label: "장비 아이디", hide: true, primary: true},
    {id: "name", numeric: false, disablePadding: false, label: "제품 이름"},
    {id: "serialNumber", numeric: false, disablePadding: false, label: "제품 고유 번호"},
    {id: "model.name", numeric: false, disablePadding: false, label: "모델 이름"},
    {id: "model.manufacturer.name", numeric: false, disablePadding: false, label: "제조사 이름"},
    {id: "createdDatetime", numeric: false, disablePadding: false, label: "등록날짜"}
];


export const DeviceList = props => {
    const classes = useStyles();
    const {store} = props;

    const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/devices"
    });

    const handleClick = name => {
        store.setValue("deviceId", name);
    };

    return (
        <div className={classes.content}>
            {loading && 'Loading...'}
            {data && <EnhancedTableWithoutCheckbox title={"제품 이력 - 제품 선택"} rows={data.data.content} headCells={headCells} dense rowClick={handleClick}/>}
        </div>
    );
};