import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import {useAxios} from "../../../hooks";

const columns = [
    {id: 'name'},
    {id: 'address'}
];


export const SiteListBoard = props => {
    const {onClick} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/sites`
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);

    };

    const handleOnClick = value => {
        onClick(value);
    };

    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label={"sticky table"} size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>현장명</TableCell>
                            <TableCell align={"center"}>주소</TableCell>
                            <TableCell align={"center"}>위치</TableCell>
                            <TableCell align={"center"}>임계치</TableCell>
                            <TableCell align={"center"}>환경정보</TableCell>
                            <TableCell align={"center"}>이상정보</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.data.content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow
                                    hover
                                    key={row.createdDatetime}
                                    onClick={() => handleOnClick(row.code)}
                                >
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={"center"}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align={"center"}>
                                        -
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        -
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        -
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        -
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data ? data.data.totalElements : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
