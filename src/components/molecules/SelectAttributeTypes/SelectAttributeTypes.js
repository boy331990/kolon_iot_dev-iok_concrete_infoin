import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";

const data = [
    {label: "범위형", value: "RANGE"},
    {label: "열거형", value: "ENUMERATION"}
];

export const SelectAttributeTypes = props => {
    const {store, required} = props;

    const handleChange = event => store.setValue("valueType", event.target.value);

    return useObserver(() => (
        <FormControl fullWidth variant={"outlined"} margin={"dense"}>
            <InputLabel id={"select-outlined-label-value-type"} margin={"dense"} required={required}>
                장비 속성 형태
            </InputLabel>
            <Select
                labelId={"select-outlined-label-value-type"}
                id={"select-outlined-value-type"}
                margin={"dense"}
                labelWidth={120}
                value={store["valueType"] ? store["valueType"] : ''}
                onChange={handleChange}
            >
                {data && data.map((item, index) => (
                    <MenuItem key={index} value={item["value"]}>{item["label"]} ({item["value"]})</MenuItem>
                ))}
            </Select>
        </FormControl>
    ))
};
