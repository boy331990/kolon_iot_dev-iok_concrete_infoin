import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CloudUpload as CloudUploadIcon} from "@material-ui/icons";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Toolbar, Tooltip, Typography, Button} from "@material-ui/core";
import {EnhancedTableHead} from "../../molecules";
import {getComparator, getNestedObject, stableSort} from "../../../functions";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles(() => ({
    paper: {
        width: "100%",
    },
    table: {
        minWidth: 750
    },
    hide: {
        display: "none"
    },
    title: {
        flex: "1 1 70%"
    },
    input: {
        display: "none"
    }
}));


export const EnhancedTableWithoutCheckbox = (props) => {
    const {title, headCells, rows, orderByKeyword, orderKeyword, rowClick, dense, downloadButton, onUpload} = props;
    const classes = useStyles();
    const [order, setOrder] = useState(orderKeyword ? orderKeyword : "desc");
    const [orderBy, setOrderBy] = useState(orderByKeyword ? orderByKeyword : "createdDatetime");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    const history = useHistory();

    const handleClick = id => {
        history.push("/site/setting/add");
   };

    return (
        <Paper className={classes.paper}>
            {
                title &&
                <Toolbar>
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        {title}
                    </Typography>
                    {
                        downloadButton && downloadButton
                    }
                    {
                        onUpload &&
                        <>
                            <input type={"file"} accept=".xlsx" id="icon-button-file" className={classes.input} onChange={onUpload}/>
                            <label htmlFor="icon-button-file">
                                <Tooltip title={"업로드"}>
                                    <IconButton aria-label={"templete-upload"} component={"span"}>
                                        <CloudUploadIcon/>
                                    </IconButton>
                                </Tooltip>
                            </label>
                        </>
                    }
                </Toolbar>
            }
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        headCells={headCells}
                        order={order}
                        orderBy={orderBy}
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

                                    // return !headCell.hide && (<TableCell key={index} align="left">{rowValue ? String(rowValue) : '-'}</TableCell>)
                                    if(headCell.id === 'add1') {
                                        return !headCell.hide && (<TableCell key={index} align="left"><Button variant={"outlined"} size={"small"} onClick={handleClick}>등록/수정</Button></TableCell>)
                                    } else if(headCell.id === 'add2') {
                                        return !headCell.hide && (<TableCell key={index} align="left">{headCell.component}</TableCell>)
                                    } else {
                                        return !headCell.hide && (<TableCell key={index} align="left">{rowValue ? String(rowValue) : '-'}</TableCell>)
                                    }
                                });

                                return (
                                    <TableRow
                                        hover
                                        onClick={() => rowClick && rowClick(primaryValue)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                    >
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
                                <TableCell colSpan={8}/>
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