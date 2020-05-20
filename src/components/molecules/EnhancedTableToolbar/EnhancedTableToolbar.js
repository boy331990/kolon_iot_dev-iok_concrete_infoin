import React from 'react';
import clsx from "clsx";
import {IconButton, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {lighten, makeStyles} from "@material-ui/core/styles";
import {AddBox as AddBoxIcon, Delete as DeleteIcon} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    title: {
        flex: "1 1 100%"
    }
}));

export const EnhancedTableToolbar = (props) => {
    const classes = useStyles();
    const {title, numSelected, onDelete, onAdd} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={onDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : onAdd && (
                <Tooltip title="Add">
                    <IconButton aria-label="Add" onClick={onAdd}>
                        <AddBoxIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};