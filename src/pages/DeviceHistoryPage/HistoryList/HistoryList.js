import React from 'react';
import {observer} from "mobx-react-lite";
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
    {id: "createdDatetime", numeric: false, disablePadding: false, label: "일짜"},
    {id: "type", numeric: false, disablePadding: false, label: "프로퍼티 타입"},
    {id: "code", numeric: false, disablePadding: false, label: "코드"},
    {id: "value", numeric: false, disablePadding: false, label: "값"},
];


export const HistoryList = observer(props => {
    const classes = useStyles();
    const {store} = props;

    const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/username/kyong_hur@kolon.com/devices/${store.deviceIdData}/statuses/logs?startTime=2020-03-04T09:10:05.663Z&endTime=2020-03-04T09:25:02.449Z&page=1&size=100`
    });

    let tempData = [];
    data && Array.isArray(data.data.content) && data.data.content.map((item, index) => {
        item.attributes && item.attributes.map(attribute => tempData.push({
            createdDatetime: item.createdDatetime,
            type: "속성",
            code: attribute.code,
            value: attribute.value
        }));
        item.operations && item.attributes.map(operation => tempData.push({
            createdDatetime: item.createdDatetime,
            type: "행위",
            code: operation.code,
            value: operation.value
        }));
        return false;
    });

    const handleClick = name => {
        console.log(name);
    };

    return (
        <div className={classes.content}>
            {loading && 'Loading...'}
            {data && <EnhancedTableWithoutCheckbox title={"사용 이력"} rows={tempData} headCells={headCells} dense rowClick={handleClick}/>}
        </div>
    );
});