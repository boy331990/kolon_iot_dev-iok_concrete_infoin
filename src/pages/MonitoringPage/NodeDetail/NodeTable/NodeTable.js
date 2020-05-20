import React from 'react';

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const columns = [
    {id: 'baseDate'},
    {id: 'baseTime'},
    {id: 'elapsedTime'},
    {id: 'temperature1'},
    {id: 'temperature2'},
    {id: 'temperature3'},
    {id: 'temperature4'},
    {id: 'difference'}
];

const useStyles = makeStyles({
    root: {
        fontSize: '10px'
    },
    container: {
        fontSize: '10px'
    },
});

export const NodeTable = props => {
    const classes = useStyles();
    const {data} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    /*const data = [
        {baseDate: "11/20", baseTime: "17:00", elapsedTime: "50hr", under: 12, middle: 12, up: 12, surface: 11, difference: 0.6},
        {baseDate: "11/20", baseTime: "16:00", elapsedTime: "49hr", under: 10, middle: 11, up: 11, surface: 12, difference: 0.3},
        {baseDate: "11/20", baseTime: "15:00", elapsedTime: "48hr", under: 11, middle: 12, up: 12, surface: 12, difference: 0.7},
        {baseDate: "11/20", baseTime: "14:00", elapsedTime: "47hr", under: 12, middle: 13, up: 14, surface: 13, difference: 1.1},
        {baseDate: "11/20", baseTime: "13:00", elapsedTime: "46hr", under: 12, middle: 13, up: 15, surface: 13, difference: 0.8},
        {baseDate: "11/20", baseTime: "12:00", elapsedTime: "45hr", under: 30, middle: 41, up: 33, surface: 13, difference: 10.3},
        {baseDate: "11/20", baseTime: "11:00", elapsedTime: "44hr", under: 22, middle: 20, up: 16, surface: 15, difference: 0.1}
    ];*/
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);

    };

    return (
        <Paper>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label={"sticky table"} size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"} padding={"none"}>일시</TableCell>
                            <TableCell align={"center"} padding={"none"}>측정시간</TableCell>
                            <TableCell align={"center"} padding={"none"}>경과시간</TableCell>
                            <TableCell align={"center"} padding={"none"}>하부</TableCell>
                            <TableCell align={"center"} padding={"none"}>중부(내부)</TableCell>
                            <TableCell align={"center"} padding={"none"}>상부온도</TableCell>
                            <TableCell align={"center"} padding={"none"}>표면온도</TableCell>
                            <TableCell align={"center"} padding={"none"}>차이(중심-상부)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover key={row.baseTime}>
                                    {columns.map(column => {
                                        let value = row[column.id];
                                        if (column.id === 'difference') {
                                            value = (row.temperature4 - row.temperature2).toFixed(2);
                                        }
                                        return (
                                            <TableCell key={column.id} align={"center"} padding={"none"}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
};