import React from "react";
import {TextField} from "@material-ui/core";

export const EnhancedTextField = ({variant, label, name, store, required, margin, autoComplete, disabled}) => {
    return (
        <TextField
            fullWidth
            label={label}
            margin={margin}
            name={name}
            required={required}
            defaultValue={store[name]}
            onChange={event => store.setValue(name, event.target.value)}
            variant={variant}
            autoComplete={autoComplete}
            disabled={disabled}
        />
    )
};
