import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router";
import {useAxios} from "../../../hooks";

const columns = [
    {id: 'siteName'},
    {id: 'placeName'},
    {id: 'state'},
    {id: 'startDatetime'},
    {id: 'endDatetime'},
    {id: 'temperatureCrackingType'},
    {id: 'externalRestrictionFactor'},
    {id: 'devices'}
];


export const PlaceListBoard = props => {
    const history = useHistory();
    const {siteCode} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {data} = useAxios({
        url: process.env.REACT_APP_API_CONCRETE + `/concrete/sites/${siteCode}/information`
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);

    };

    const handleClick = value => {
        history.push(`/monitoring?siteCode=${value.siteCode}&placeCode=${value.placeCode}`);
    };

    const handleButton = event => {
        event.stopPropagation();
        history.push("/mix-table");
    };

    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label={"sticky table"} size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>현장명</TableCell>
                            <TableCell align={"center"}>장소명</TableCell>
                            <TableCell align={"center"}>상태</TableCell>
                            <TableCell align={"center"}>시작일</TableCell>
                            <TableCell align={"center"}>종료일</TableCell>
                            <TableCell align={"center"}>온도균열 발생유형</TableCell>
                            <TableCell align={"center"}>관리기준 균열지수</TableCell>
                            <TableCell align={"center"}>장비 총합</TableCell>
                            <TableCell align={"center"}>배합표</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.data.content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow hover key={index} onClick={() => handleClick(row)}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={"center"}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align={"center"}>
                                        <Button fullWidth variant={"outlined"} onClick={handleButton}>보기</Button>
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
                count={data ? data.data.content.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
