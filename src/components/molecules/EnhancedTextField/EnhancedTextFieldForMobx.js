import React from "react";
import {TextField} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";

export const EnhancedTextFieldForMobx = ({variant, label, name, store, required, margin, autoComplete, disabled, onChange}) => {

    const handleOnChange = (event) => {
        onChange(event.target.name, event.target.value);
    };

    return useObserver(() => (
        <TextField
            fullWidth
            label={label}
            margin={margin}
            name={name}
            required={required}
            value={store[name] ? store[name] : ''}
            onChange={handleOnChange}
            variant={variant}
            autoComplete={autoComplete}
            disabled={disabled}
        />
    ));
};
