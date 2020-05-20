import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton, InputBase, Paper} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    wrap: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

export const SearchInputBar = ({onRefresh}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.wrap}>
            <InputBase
                className={classes.input}
                placeholder="Search"
                inputProps={{'aria-label': 'search'}}
            />
            <IconButton type="button" className={classes.iconButton} aria-label="search" onClick={onRefresh}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
