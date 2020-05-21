import React, { useEffect, useState } from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Input} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import defaultAxios from "axios";
import moment from 'moment';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


export const MixTable = (props) => {

    const [siteName, setsiteName] = useState('');
    const [placeName, setplaceName] = useState('');
    const [startDatetime, setstartDatetime] = useState('');
    const [standardCrackFactor, setstandardCrackFactor] = useState('');
    const [pourSite, setpourSite] = useState('');
    const [pourPosition, setpourPosition] = useState('');
    const [pourThickness, setpourThickness] = useState('');
    const [pourHeight0, setpourHeight0] = useState('');
    const [pourHeight1, setpourHeight1] = useState('');
    const [pourHeight2, setpourHeight2] = useState('');
    const [pourHeight3, setpourHeight3] = useState('');
    const [curingMethod, setcuringMethod] = useState('');

    const [concreteKinds, setconcreteKinds] = useState('');
    const [maxDimension, setmaxDimension] = useState('');
    const [nominalStrength, setnominalStrength] = useState('');
    const [slump, setslump] = useState('');

    const [mixedMaterialArray, setmixedMaterialArray] = useState([]);
    const [totalCombinedAmount, settotalCombinedAmount] = useState('');
    const [mixedCementRatio, setmixedCementRatio] = useState('');

    const [etc, setetc] = useState([]);

    const [c1 , setc1 ] = useState('');
    const [c2 , setc2 ] = useState('');
    const [c3 , setc3 ] = useState('');
    const [fa , setfa ] = useState('');
    const [bs , setbs ] = useState('');
    const [w1 , setw1 ] = useState('');
    const [w2 , setw2 ] = useState('');
    const [sc , setsc ] = useState('');
    const [sw , setsw ] = useState('');
    const [g1 , setg1 ] = useState('');
    const [g2 , setg2 ] = useState('');
    const [ad1, setad1] = useState('');
    const [ad2, setad2] = useState('');
    const [ad3, setad3] = useState('');
    const [couplingRatio, setcouplingRatio] = useState('');
    const [fineAggregateRatio, setfineAggregateRatio] = useState('');


    const query = useQuery();

    useEffect(() => {

        const options = {
            url: process.env.REACT_APP_API_CONCRETE + (`/concrete/sites/${query.get("siteCode")}/places/${query.get("placeCode")}/information`),
            method: 'get'
        };
    
        defaultAxios(options).then(response => {

            const data = response.data;
            console.log(data);
            
            const siteName                      = data.siteName                 ;
            const placeName                     = data.placeName                ;
            const startDatetime                 = data.startDatetime            ;
            const standardCrackFactor           = data.standardCrackFactor      ;

            setsiteName(siteName);
            setplaceName(placeName);
            setstartDatetime(moment(startDatetime).format('yyyy-MM-DD'));
            setstandardCrackFactor(standardCrackFactor);

            if(data.mixtureInformation !== undefined && data.mixtureInformation !== "null") {
                const mixtureInformationObj = JSON.parse(data.mixtureInformation);
                const pourSite                      = mixtureInformationObj.pourSite;
                const pourPosition                  = mixtureInformationObj.pourPosition;
                const pourThickness                 = mixtureInformationObj.pourThickness;
                const pourHeight                    = mixtureInformationObj.pourHeight;
                const curingMethod                  = mixtureInformationObj.curingMethod;

                setpourSite(pourSite);
                setpourPosition(pourPosition) ;
                setpourThickness(pourThickness);
                for(const i in pourHeight) {
                    switch (i) {
                        case '0':
                            setpourHeight0(pourHeight[0]);
                            break;
                        case '1':
                            setpourHeight1(pourHeight[1]);
                            break;
                        case '2':
                            setpourHeight2(pourHeight[2]);
                            break;
                        case '3':
                            setpourHeight3(pourHeight[3]);
                            break;
                        default:
                            break;
                    }
                }
                setcuringMethod(curingMethod);


              
                if(mixtureInformationObj.nominalMethod !== undefined && mixtureInformationObj.nominalMethod !== "null") {
                    const nominalMethodObj = mixtureInformationObj.nominalMethod;
                    const concreteKinds                 = nominalMethodObj.concreteKinds;
                    const maxDimension                  = nominalMethodObj.maxDimension;
                    const nominalStrength               = nominalMethodObj.nominalStrength;
                    const slump                         = nominalMethodObj.slump;

                    //호칭방법
                    setconcreteKinds(concreteKinds);
                    setmaxDimension(maxDimension);
                    setnominalStrength(nominalStrength);
                    setslump(slump);
                }


                if(mixtureInformationObj.specification !== undefined && mixtureInformationObj.specification !== "null") {
                    const specificationObj = mixtureInformationObj.specification;
                    const totalCombinedAmount           = specificationObj.totalCombinedAmount;
                    const mixedMaterialArray            = specificationObj.mixedMaterial;
                    const mixedCementRatio              = specificationObj.mixedCementRatio;

                    settotalCombinedAmount(totalCombinedAmount);
                    setmixedCementRatio(mixedCementRatio);
                    setmixedMaterialArray(mixedMaterialArray);
                    
                }


                if(mixtureInformationObj.etc !== undefined && mixtureInformationObj.etc !== "null") {
                    const etcArray = mixtureInformationObj.etc;
                    setetc(etcArray);
                }


                if(mixtureInformationObj.formula !== undefined && mixtureInformationObj.formula !== "null") {
                    const formulaObj = mixtureInformationObj.formula;
                    const c1                            = formulaObj.c1;
                    const c2                            = formulaObj.c2;
                    const c3                            = formulaObj.c3;
                    const fa                            = formulaObj.fa;
                    const bs                            = formulaObj.bs;
                    const w1                            = formulaObj.w1;
                    const w2                            = formulaObj.w2;
                    const sc                            = formulaObj.sc;
                    const sw                            = formulaObj.sw;
                    const g1                            = formulaObj.g1;
                    const g2                            = formulaObj.g2;
                    const ad1                           = formulaObj.ad1;
                    const ad2                           = formulaObj.ad2;
                    const ad3                           = formulaObj.ad3;
                    const couplingRatio                 = formulaObj.couplingRatio;
                    const fineAggregateRatio            = formulaObj.fineAggregateRatio;

                    setc1 (c1);
                    setc2 (c2);
                    setc3 (c3);
                    setfa (fa);
                    setbs (bs);
                    setw1 (w1);
                    setw2 (w2);
                    setsc (sc);
                    setsw (sw);
                    setg1 (g1);
                    setg2 (g2);
                    setad1(ad1);
                    setad2(ad2);
                    setad3(ad3);
                    setcouplingRatio(couplingRatio);
                    setfineAggregateRatio(fineAggregateRatio);
                }


            }
            

            

    
        }).catch(reason => {
            console.error(reason);
        });
    
    }, []);

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
                                    <TableCell align={"center"}>{siteName}</TableCell>
                                    <TableCell align={"center"}>{placeName}</TableCell>
                                    <TableCell align={"center"}>{startDatetime}</TableCell>
                                    <TableCell align={"center"}>{pourSite}</TableCell>
                                    <TableCell align={"center"}>{pourPosition}</TableCell>
                                    <TableCell align={"center"}>{pourThickness}</TableCell>
                                    <TableCell align={"center"}>{pourHeight0}</TableCell>
                                    <TableCell align={"center"}>{pourHeight1}</TableCell>
                                    <TableCell align={"center"}>{pourHeight2}</TableCell>
                                    <TableCell align={"center"}>{pourHeight3}</TableCell>
                                    <TableCell align={"center"}>{curingMethod}</TableCell>
                                    <TableCell align={"center"}>{standardCrackFactor}</TableCell>
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
                                            <TableCell align={"center"} colSpan={2}>{concreteKinds}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>굵은 골재의 최대치수</TableCell>
                                            <TableCell align={"center"}>{maxDimension}</TableCell>
                                            <TableCell align={"center"}>mm</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>호칭강도</TableCell>
                                            <TableCell align={"center"}>{nominalStrength}</TableCell>
                                            <TableCell align={"center"}>MPa</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>슬럼프 또는 슬럼프 플로우</TableCell>
                                            <TableCell align={"center"}>{slump}</TableCell>
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
                                            <TableCell align={"center"}>{totalCombinedAmount}</TableCell>
                                            <TableCell align={"center"}>kg/m3</TableCell>
                                        </TableRow>
                                        {mixedMaterialArray.map((list, index) => (
                                            <TableRow key={index}>
                                                <TableCell align={"center"} variant={"head"} >혼화재료 ({list.name})</TableCell>
                                                <TableCell align={"center"} >{list.amount}</TableCell>
                                                <TableCell align={"center"} >{list.unit}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell align={"center"} variant={"head"}>혼합시멘트 (사용비율)</TableCell>
                                            <TableCell align={"center"}>{mixedCementRatio}</TableCell>
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
                                        {etc.map((list, index) => (
                                            <TableRow key={index}>
                                                {index===0 && <TableCell align={"center"} rowSpan={4}>기타</TableCell>}
                                                <TableCell align={"center"} variant={"head"}>{list.name}</TableCell>
                                                <TableCell align={"center"}>{list.value}</TableCell>
                                                <TableCell align={"center"}>{list.unit}</TableCell>
                                            </TableRow>
                                        ))}
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
                                {/* <TableRow>
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
                                </TableRow> */}
                                <TableRow>
                                    <TableCell align={"center"}>{c1}</TableCell>
                                    <TableCell align={"center"}>{c2}</TableCell>
                                    <TableCell align={"center"}>{c3}</TableCell>
                                    <TableCell align={"center"}>{fa}</TableCell>
                                    <TableCell align={"center"}>{bs}</TableCell>
                                    <TableCell align={"center"}>{w1}</TableCell>
                                    <TableCell align={"center"}>{w2}</TableCell>
                                    <TableCell align={"center"}>{sc}</TableCell>
                                    <TableCell align={"center"}>{sw}</TableCell>
                                    <TableCell align={"center"}>{g1}</TableCell>
                                    <TableCell align={"center"}>{g2}</TableCell>
                                    <TableCell align={"center"}>{ad1}</TableCell>
                                    <TableCell align={"center"}>{ad2}</TableCell>
                                    <TableCell align={"center"}>{ad3}</TableCell>
                                </TableRow>
                                {/* <TableRow>
                                    <TableCell align={"center"} colSpan={4} variant={"head"}>물-결합재비(W/B)</TableCell>
                                    <TableCell align={"center"} colSpan={2}>47.5</TableCell>
                                    <TableCell align={"center"}>%</TableCell>
                                    <TableCell align={"center"} colSpan={4} variant={"head"}>잔골재율(S/a)</TableCell>
                                    <TableCell align={"center"} colSpan={2}>47.3</TableCell>
                                    <TableCell align={"center"}>%</TableCell>
                                </TableRow> */}
                                <TableRow>
                                    <TableCell align={"center"} colSpan={4} variant={"head"}>물-결합재비(W/B)</TableCell>
                                    <TableCell align={"center"} colSpan={2}>{couplingRatio}</TableCell>
                                    <TableCell align={"center"}>%</TableCell>
                                    <TableCell align={"center"} colSpan={4} variant={"head"}>잔골재율(S/a)</TableCell>
                                    <TableCell align={"center"} colSpan={2}>{fineAggregateRatio}</TableCell>
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