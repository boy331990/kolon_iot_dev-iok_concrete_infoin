import React from 'react';
import {EnhancedTableWithoutCheckbox} from "../../../components/molecules";


const headCells = [
    {id: "operationId", numeric: true, disablePadding: false, label: "장비 행위아이디", hide: true, primary: true},
    {id: "code", numeric: false, disablePadding: false, label: "장비 행위코드"},
    {id: "name", numeric: false, disablePadding: false, label: "장비 행위이름"},
    {id: "valueType", numeric: false, disablePadding: false, label: "형태"}
];


export const DeviceOperations = props => {
    const {rows} = props;

    return (
        <EnhancedTableWithoutCheckbox title={"장비 행위"} rows={rows} headCells={headCells} dense/>
    );
};