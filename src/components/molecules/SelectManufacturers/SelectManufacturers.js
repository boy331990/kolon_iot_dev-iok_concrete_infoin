import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useAxios} from "../../../hooks";
import {useObserver} from "mobx-react-lite";


export const SelectManufacturers = props => {
    const {defaultValue, required, onChange} = props;
    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/manufacturers"
    });

    const handleOnChange = (event) => {
        onChange(event.target.name, event.target.value);
    };

    return useObserver(() => (
        <FormControl fullWidth variant={"outlined"} margin={"dense"}>
            <InputLabel id={"select-outlined-label-manufacturers"} margin={"dense"} required={required}>
                제조사명
            </InputLabel>
            <Select
                labelId={"select-outlined-label-manufacturers"}
                id={"select-outlined-manufacturers"}
                margin={"dense"}
                labelWidth={75}
                name={"manufacturerCode"}
                value={defaultValue ? defaultValue : ''}
                onChange={handleOnChange}
            >
                {data && data.data.content.map((item, index) => (
                    <MenuItem key={index} value={item["code"]}>{item["name"]} ({item["code"]})</MenuItem>
                ))}
            </Select>
        </FormControl>
    ))
};
