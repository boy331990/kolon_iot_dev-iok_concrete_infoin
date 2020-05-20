import React, { useEffect } from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Input} from "@material-ui/core";
import { useHistory } from "react-router-dom";



export const MixTable = (props) => {

    let history = useHistory();
    let url = history.location.pathname;

    let mixTableUrl =  url !== '/mix-table' ? true : false;

    //console.log(props);
    const {siteName, placeName} = props
    return (
        <Paper>
            <Grid container direction={"column"}>
                <Grid item xs>
                    <TableContainer>
                        <Table stickyHeader aria-label={"sticky table"}>
                            <TableBody>
                                <TableRow>
                                    <TableCell align={"center"} rowSpan={3} variant={"head"}>기본사항</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>현장명</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>타설지역</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>콘크리트 타설일</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>타설부위[mm]</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>타설위치</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>타설두께[mm]</TableCell>
                                    <TableCell align={"center"} colSpan={4} variant={"head"}>타설높이[mm]</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>양생방법</TableCell>
                                    <TableCell align={"center"} rowSpan={2} variant={"head"}>관리기준 균열지수</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"center"}>1단</TableCell>
                                    <TableCell align={"center"}>2단</TableCell>
                                    <TableCell align={"center"}>3단</TableCell>
                                    <TableCell align={"center"}>n단</TableCell>
                                </TableRow>
                                <TableRow>
                                    {/* <TableCell align={"center"}>LH건설<br/>세종</TableCell>
                                    <TableCell align={"center"}>서울 구로</TableCell>
                                    <TableCell align={"center"}>2020-10-20</TableCell>
                                    <TableCell align={"center"}>매트기초</TableCell>
                                    <TableCell align={"center"}>연질의 지반 위</TableCell>
                                    <TableCell align={"center"}>2,600</TableCell>
                                    <TableCell align={"center"}>800</TableCell>
                                    <TableCell align={"center"}>800</TableCell>
                                    <TableCell align={"center"}>1,000</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                    <TableCell align={"center"}>버블시트</TableCell>
                                    <TableCell align={"center"}>1.2</TableCell> */}
                                    <TableCell align={"center"}>{mixTableUrl && <Input id={"siteName"} name={"siteName"} value={siteName}></Input>}</TableCell>
                                    <TableCell align={"center"}><Input id={"placeName"} name={"placeName"} value={placeName}></Input></TableCell>
                                    <TableCell align={"center"}><Input id={"startDatetime"} name={"startDatetime"}></Input>2020-10-20</TableCell>
                                    <TableCell align={"center"}><Input id={"pourSite"} name={"pourSite"}></Input>매트기초</TableCell>
                                    <TableCell align={"center"}><Input id={"pourPosition"} name={"pourPosition"}></Input>연질의 지반 위</TableCell>
                                    <TableCell align={"center"}><Input id={"pourThickness"} name={"pourThickness"}></Input>2,600</TableCell>
                                    <TableCell align={"center"}><Input id={"pourHeight1"} name={"pourHeight1"}></Input>800</TableCell>
                                    <TableCell align={"center"}><Input id={"pourHeight2"} name={"pourHeight2"}></Input>800</TableCell>
                                    <TableCell align={"center"}><Input id={"pourHeight3"} name={"pourHeight3"}></Input>1,000</TableCell>
                                    <TableCell align={"center"}><Input id={"pourHeightN"} name={"pourHeightN"}></Input>-</TableCell>
                                    <TableCell align={"center"}><Input id={"curingMethod"} name={"curingMethod"}></Input>버블시트</TableCell>
                                    <TableCell align={"center"}><Input id={"standardCrackFactor"} name={"standardCrackFactor"}></Input>1.2</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs>
                    <Grid container>
                        <Grid item xs>
                            <TableContainer>
                                <Table stickyHeader aria-label={"3tab table"}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"center"} rowSpan={4}>호칭방법</TableCell>
                                            <TableCell align={"center"} variant={"head"}>콘크리트의 종류</TableCell>
                                            <TableCell align={"center"} colSpan={2}><Input id={"concreteKinds"} name={"concreteKinds"}></Input></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>굵은 골재의 최대치수</TableCell>
                                            <TableCell align={"center"}>25</TableCell>
                                            <TableCell align={"center"}>mm</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>호칭강도</TableCell>
                                            <TableCell align={"center"}>24</TableCell>
                                            <TableCell align={"center"}>MPa</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>슬럼프 또는 슬럼프 플로우</TableCell>
                                            <TableCell align={"center"}>150</TableCell>
                                            <TableCell align={"center"}>mm</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs>
                            <TableContainer>
                                <Table stickyHeader aria-label={"3tab table"}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"center"} rowSpan={4}>지정사항</TableCell>
                                            <TableCell align={"center"} variant={"head"}>총결합재량</TableCell>
                                            <TableCell align={"center"}>349</TableCell>
                                            <TableCell align={"center"}>kg/m3</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>혼화재료 (플라이애시)</TableCell>
                                            <TableCell align={"center"}>20</TableCell>
                                            <TableCell align={"center"}>%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>혼화재료 (고로슬래그 미분말)</TableCell>
                                            <TableCell align={"center"}>30</TableCell>
                                            <TableCell align={"center"}>%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>혼합시멘트 (사용비율)</TableCell>
                                            <TableCell align={"center"}>0</TableCell>
                                            <TableCell align={"center"}>%</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs>
                            <TableContainer>
                                <Table stickyHeader aria-label={"3tab table"}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"center"} rowSpan={4}>기타</TableCell>
                                            <TableCell align={"center"} variant={"head"}>염화물량</TableCell>
                                            <TableCell align={"center"}>0.3</TableCell>
                                            <TableCell align={"center"}>kg/m3 이하</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>공기량</TableCell>
                                            <TableCell align={"center"}>4.5±1.5</TableCell>
                                            <TableCell align={"center"}>%</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <TableContainer>
                        <Table stickyHeader aria-label={"sticky table"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"center"} colSpan={14}>배합표(kg/m3)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"center"} colSpan={3}>시멘트</TableCell>
                                    <TableCell align={"center"} colSpan={2}>혼화재료</TableCell>
                                    <TableCell align={"center"} colSpan={2}>물</TableCell>
                                    <TableCell align={"center"} colSpan={2}>잔골재</TableCell>
                                    <TableCell align={"center"} colSpan={2}>굵은골재</TableCell>
                                    <TableCell align={"center"} colSpan={3}>화학혼화제</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"center"}>시멘트 C1</TableCell>
                                    <TableCell align={"center"}>특수 시멘트 C2</TableCell>
                                    <TableCell align={"center"}>슬래그 시멘트 SC</TableCell>
                                    <TableCell align={"center"}>플라이 애시 FA</TableCell>
                                    <TableCell align={"center"}>고로 슬래그 BS</TableCell>
                                    <TableCell align={"center"}>물 W1</TableCell>
                                    <TableCell align={"center"}>회수수 W2</TableCell>
                                    <TableCell align={"center"}>부순 잔골재 SC</TableCell>
                                    <TableCell align={"center"}>세척 잔골재 SW</TableCell>
                                    <TableCell align={"center"}>굵은 골재① G1</TableCell>
                                    <TableCell align={"center"}>굵은 골재② G2</TableCell>
                                    <TableCell align={"center"}>혼화제① AD1</TableCell>
                                    <TableCell align={"center"}>혼화제② AD2</TableCell>
                                    <TableCell align={"center"}>혼화제③ AD3</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align={"center"}>139</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                    <TableCell align={"center"}>70</TableCell>
                                    <TableCell align={"center"}>140</TableCell>
                                    <TableCell align={"center"}>166</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                    <TableCell align={"center"}>836</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                    <TableCell align={"center"}>942</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                    <TableCell align={"center"}>2.79</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                    <TableCell align={"center"}>-</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"center"} colSpan={4} variant={"head"}>물-결합재비(W/B)</TableCell>
                                    <TableCell align={"center"} colSpan={2}>47.5</TableCell>
                                    <TableCell align={"center"}>%</TableCell>
                                    <TableCell align={"center"} colSpan={4} variant={"head"}>잔골재율(S/a)</TableCell>
                                    <TableCell align={"center"} colSpan={2}>47.3</TableCell>
                                    <TableCell align={"center"}>%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
};