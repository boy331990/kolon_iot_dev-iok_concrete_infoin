import React from 'react';
import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

export const EnhancedTableHead = (props) => {
    const {headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const classes = useStyle();
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {
                    onSelectAllClick &&
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{"aria-label": "select all desserts"}}
                        />
                    </TableCell>
                }
                {headCells.map(headCell => {

                    if (headCell.hide) return null;

                    return (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "default"}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
};