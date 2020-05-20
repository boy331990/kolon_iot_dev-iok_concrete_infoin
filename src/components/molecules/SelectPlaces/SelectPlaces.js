import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useAxios} from "../../../hooks";
import {makeStyles} from "@material-ui/core/styles";


const useStyle = makeStyles(() => ({
    formControl: {
        minWidth: 120
    }
}));

export const SelectPlaces = props => {
    const {defaultValue, siteCode, required, onChange} = props;
    const classes = useStyle();
    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/sites/${siteCode}/places`
    });

    const handleOnChange = (event) => {
        onChange(event.target.name, event.target.value);
    };

    return (
        <FormControl fullWidth variant={"outlined"} className={classes.formControl} margin={"dense"}>
            <InputLabel id={"select-outlined-label-places"} margin={"dense"} required={required} shrink>
                장소명
            </InputLabel>
            <Select
                labelId={"select-outlined-label-places"}
                id={"select-outlined-places"}
                margin={"dense"}
                labelWidth={50}
                name={"placeCode"}
                value={defaultValue ? defaultValue : ' '}
                onChange={handleOnChange}
                displayEmpty
            >
                <MenuItem value={' '}>전체</MenuItem>
                {data && data.data.content.map((item, index) => (
                    <MenuItem key={index} value={item["code"]}>{item["name"]}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};
