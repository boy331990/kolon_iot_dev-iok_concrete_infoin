import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useAxios} from "../../../hooks";
import {useObserver} from "mobx-react-lite";


export const SelectTypes = props => {
    const {store, required} = props;
    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/devices/types"
    });

    const handleChange = event => {
        store.setValue(["type", "code"], event.target.value);
        store.setValue("typeCode", event.target.value);
    };

    return useObserver(() => (
        <FormControl fullWidth variant={"outlined"} margin={"dense"}>
            <InputLabel id={"select-outlined-label-types"} margin={"dense"} required={required}>
                장비 타입
            </InputLabel>
            <Select
                labelId={"select-outlined-label-types"}
                id={"select-outlined-types"}
                margin={"dense"}
                labelWidth={75}
                value={store["typeCode"] ? store["typeCode"] : ''}
                onChange={handleChange}
            >
                {data && data.data.content.map((item, index) => (
                    <MenuItem key={index} value={item["code"]}>{item["name"]} ({item["code"]})</MenuItem>
                ))}
            </Select>
        </FormControl>
    ))
};
