import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useAxios} from "../../../hooks";


export const SelectManufacturerModels = props => {
    const {defaultValue, required, onChange} = props;
    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/manufacturers/models"
    });

    const handleOnChange = (event) => {
        onChange(event.target.name, event.target.value);
    };

    return (
        <FormControl fullWidth variant={"outlined"} margin={"dense"}>
            <InputLabel id={"select-outlined-label-manufacturers-models"} margin={"dense"} required={required}>
                모델명
            </InputLabel>
            <Select
                labelId={"select-outlined-label-manufacturers-models"}
                id={"select-outlined-manufacturers-models"}
                margin={"dense"}
                labelWidth={75}
                name={"manufacturerModelCode"}
                value={defaultValue ? defaultValue : ''}
                onChange={handleOnChange}
            >
                {data && data.data.content.map((item, index) => (
                    <MenuItem key={index} value={item["code"]}>{item["name"]} ({item["code"]})</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};
