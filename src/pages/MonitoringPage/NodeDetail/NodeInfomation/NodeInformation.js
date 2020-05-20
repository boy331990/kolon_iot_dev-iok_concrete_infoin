import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useAxios} from "../../../../hooks";


export const NodeInformation = props => {
    const {siteCode, placeCode} = props;

    const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_CONCRETE + `/concrete/sites/${siteCode}/places/${placeCode}/information`
    })

    console.log(data);

    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label={"sticky table"} size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>현장명</TableCell>
                            <TableCell align={"center"}>장소(구역)</TableCell>
                            <TableCell align={"center"}>노드번호</TableCell>
                            <TableCell align={"center"}>경과시간</TableCell>
                            <TableCell align={"center"}>최고온도 도달시간(내부)</TableCell>
                            <TableCell align={"center"}>내부 온도</TableCell>
                            <TableCell align={"center"}>상부 온도</TableCell>
                            <TableCell align={"center"}>온도균열 발생유형</TableCell>
                            <TableCell align={"center"}>관리기준 균열지수</TableCell>
                            <TableCell align={"center"}>온도 균열지수</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading &&
                        <TableRow>
                            <TableCell align={"center"}>{data.data.content.siteName}</TableCell>
                            <TableCell align={"center"}>{data.data.content.placeName}</TableCell>
                            <TableCell align={"center"}>123</TableCell>
                            <TableCell align={"center"}>50hr</TableCell>
                            <TableCell align={"center"}>30hr</TableCell>
                            <TableCell align={"center"}>52.8℃</TableCell>
                            <TableCell align={"center"}>40.8℃</TableCell>
                            <TableCell align={"center"}>{data.data.content.temperatureCrackingType}</TableCell>
                            <TableCell align={"center"}>{data.data.content.externalRestrictionFactor}</TableCell>
                            <TableCell align={"center"}>{data.data.content.standardCrackFactor}</TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
};