import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useAxios} from "../../../hooks";
import {makeStyles} from "@material-ui/core/styles";


const useStyle = makeStyles(() => ({
    formControl: {
        minWidth: 120
    }
}));

export const SelectSites = props => {
    const {defaultValue, required, onChange} = props;
    const classes = useStyle();
    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/sites"
    });

    const handleOnChange = (event) => {
        onChange(event.target.name, event.target.value);
    };

    return (
        <FormControl fullWidth variant={"outlined"} className={classes.formControl} margin={"dense"}>
            <InputLabel id={"select-outlined-label-sites"} margin={"dense"} required={required}>
                현장명
            </InputLabel>
            <Select
                labelId={"select-outlined-label-sites"}
                id={"select-outlined-sites"}
                margin={"dense"}
                labelWidth={50}
                name={"code"}
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
