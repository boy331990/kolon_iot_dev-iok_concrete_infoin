import React, {useState} from "react";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";


export const EnhancedPasswordInput = ({margin, label, name, store, required, autoComplete}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth margin={margin} variant="outlined">
            <InputLabel htmlFor={`outlined-adornment-${name}`} required={required} margin={margin === "dense" ? margin : undefined}>{label}</InputLabel>
            <OutlinedInput
                id={`outlined-adornment-${name}`}
                type={showPassword ? 'text' : 'password'}
                defaultValue={store[name]}
                onChange={event => store.setValue(name, event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
                margin={margin === "normal" ? "none" : margin}
                labelWidth={80}
                autoComplete={autoComplete}
            />
        </FormControl>)
};
