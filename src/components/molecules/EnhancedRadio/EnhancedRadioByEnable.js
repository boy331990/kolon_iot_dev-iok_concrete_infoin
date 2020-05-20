import React from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {useInput} from "../../../hooks";

export const EnhancedRadioByEnable = ({label, store}) => {
    const enable = useInput(store.enable);

    const handleChange = event => {
        enable.utils.setValue(event.target.value);
        store.setValue("enable", event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                aria-label="position"
                name="position"
                value={enable.props.value}
                onChange={handleChange}
                row
            >
                <FormControlLabel
                    value={"true"}
                    control={<Radio color="primary"/>}
                    label={"사용"}
                    labelPlacement={"end"}
                />
                <FormControlLabel
                    value={"false"}
                    control={<Radio color="primary"/>}
                    label={"사용안함"}
                    labelPlacement={"end"}
                />
            </RadioGroup>
        </FormControl>
    )
};
