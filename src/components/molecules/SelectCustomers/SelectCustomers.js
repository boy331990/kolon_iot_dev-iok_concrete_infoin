import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useAxios} from "../../../hooks";
import {useObserver} from "mobx-react-lite";


export const SelectCustomers = props => {
    const {store, required} = props;
    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/customers"
    });

    const handleChange = event => {
        store.setValue(["customer", "code"], event.target.value);
        store.setValue("customerCode", event.target.value);
    };

    return useObserver(() => (
        <FormControl fullWidth variant={"outlined"} margin={"dense"}>
            <InputLabel id={"select-outlined-label-customers"} margin={"dense"} required={required}>
                고객사명
            </InputLabel>
            <Select
                labelId="select-outlined-label-customers"
                id="select-outlined-customers"
                margin={"dense"}
                labelWidth={75}
                value={store["customerCode"] ? store["customerCode"] : ''}
                onChange={handleChange}
            >
                {data && data.data.content.map((item, index) => (
                    <MenuItem key={index} value={item["customerCode"]}>{item["customerName"]} ({item["customerCode"]})</MenuItem>
                ))}
            </Select>
        </FormControl>
    ))
};
