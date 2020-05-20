import React from "react";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";


const data = [
    {label: "내부구속응력", value: "INTERNAL"},
    {label: "외부구속응력", value: "OUTDOOR"}
];

export const SelectTemperatureTypes = props => {
    const {store} = props;

    const handleChange = event => store.setValue("valueType", event.target.value);

    return useObserver(() => (
        <FormControl fullWidth variant={"outlined"} margin={"dense"}>
            <Select
                labelId={"select-outlined-label-value-type"}
                id={"select-outlined-value-type"}
                margin={"dense"}
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
