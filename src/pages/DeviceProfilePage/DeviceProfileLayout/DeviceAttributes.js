import React from 'react';
import {EnhancedTableWithoutCheckbox} from "../../../components/molecules";


const headCells = [
    {id: "attributeId", numeric: true, disablePadding: false, label: "장비 속성아이디", hide: true, primary: true},
    {id: "code", numeric: false, disablePadding: false, label: "장비 속성코드"},
    {id: "name", numeric: false, disablePadding: false, label: "장비 속성이름"},
    {id: "valueType", numeric: false, disablePadding: false, label: "형태"}
];


export const DeviceAttributes = props => {
    const {rows} = props;

    return (
        <EnhancedTableWithoutCheckbox title={"장비 속성"} rows={rows} headCells={headCells} dense/>
    );
};