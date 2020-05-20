import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@material-ui/core";
import {EnhancedTableHead, EnhancedTableToolbar} from "../../molecules";
import {getComparator, getNestedObject, stableSort} from "../../../functions";


const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
    },
    table: {
        minWidth: 750
    },
    hide: {
        display: "none"
    }
}));


export const EnhancedTable = (props) => {
    const {title, headCells, rows, rowClick, deleteClick, addClick} = props;
    const classes = useStyles();
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("createdDatetime");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            let primaryKey = [];
            headCells.forEach(cell => {
                if (cell.primary) {
                    primaryKey = cell.id.split(".");
                }
            });

            const newSelecteds = rows.map(n => getNestedObject(n, primaryKey));
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectOne = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteClick = () => {
        setSelected([]);
        deleteClick(selected);
    };

    const handleAddClick = () => {
        addClick();
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Paper className={classes.paper}>
            <EnhancedTableToolbar title={title} numSelected={selected.length} onDelete={handleDeleteClick} onAdd={addClick && handleAddClick}/>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        headCells={headCells}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                let primaryValue = "";
                                let primaryHide = false;
                                let parentCode = "";
                                const cell = headCells.map((headCell, index) => {
                                    if (headCell.primary) {
                                        primaryHide = headCell.hide;
                                        primaryValue = getNestedObject(row, headCell.id.split("."));
                                    }
                                    if (headCell.parent) {
                                        parentCode = getNestedObject(row, headCell.id.split("."));
                                        primaryValue = parentCode + ':' + primaryValue;
                                    }

                                    const rowValue = getNestedObject(row, headCell.id.split("."));

                                    return !headCell.hide && (<TableCell key={index} align="left">{rowValue ? String(rowValue) : '-'}</TableCell>)
                                });
                                const isItemSelected = isSelected(primaryValue);

                                return (
                                    <TableRow
                                        hover
                                        onClick={event => rowClick(event, primaryValue)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{"aria-labelledby": labelId}}
                                                onChange={event => handleSelectOne(event, primaryValue)}
                                            />
                                        </TableCell>
                                        {!primaryHide && (<TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            {primaryValue}
                                        </TableCell>)}
                                        {cell}
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                <TableCell colSpan={headCells.length}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
};