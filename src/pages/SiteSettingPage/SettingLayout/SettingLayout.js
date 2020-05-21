import React, {useContext, useEffect, useState} from 'react';
import {Button, CardActions, CardContent, CardHeader, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextareaAutosize} from '@material-ui/core';
import {useLocalStore, useObserver} from "mobx-react-lite";
import {toJS} from "mobx";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import defaultAxios from "axios";
import {StoreContext} from "../../../context";
import {DatePickerRange} from "../../../components/molecules";
import {SelectTemperatureTypes} from "../../../components/molecules/SelectTemperatureTypes/SelectTemperatureTypes";
import {makeStyles} from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyle = makeStyles(() => ({
    card: {
        padding: 0
    }
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Details = props => {
    const history = useHistory();
    const match = useRouteMatch("/site/place/add");
    const query = useQuery();
    const {authentication} = useContext(StoreContext);
    const classes = useStyle();

    //const [value, setValue] = React.useState(1);

    const handleRadioChange = event => {
        localStore.externalRestrictionFactor = event.target.value;
    };
    
    const handleInputChange = event => {
        localStore.standardCrackFactor = event.target.value;
    };

    const handleTextareaChange = event => {
        setmixtureInformation(event.target.value);
    };

    const date = new Date();
    const monthOfYear = date.getMonth();
    date.setMonth(monthOfYear);
    date.setDate(1);

    const localStore = useLocalStore(() => ({
        siteCode: query.get("siteCode"),
        siteName: "",
        placeCode: query.get("placeCode"),
        placeName: "",
        // valueType: "",
        standardCrackFactor: "", //관리기준 균열지수
        temperatureCrackingType: "", //온도균열 발생유형
        externalRestrictionFactor: "", //외부 구속 계수
        crackDescription: "",
        startDate: date,
        endDate: Date.now(),
        startDatetime: date,
        endDatetime: Date.now(),
        setValue(name, value) {
            localStore[name] = value;
        },
        get siteCodeData() {
            return localStore.siteCode;
        }
    }));

    const handleSubmit = event => {
        event.preventDefault();

        localStore.setValue('mixtureInformation', mixtureInformation);
        localStore.setValue('startDatetime', (localStore.startDatetime.toISOString()).slice(0, -1));
        localStore.setValue('endDatetime', (localStore.endDatetime.toISOString()).slice(0, -1));

        const options = {
            // url: process.env.REACT_APP_API_GATEWAY + (match ? `/sites/${query.get("siteCode")}/places` : `/sites/${query.get("siteCode")}/places/${query.get("placeCode")}`),
            url: process.env.REACT_APP_API_CONCRETE + (`/concrete/sites/${query.get("siteCode")}/places/${query.get("placeCode")}/information`),
            method: 'put',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                //Authorization: "Bearer " + authentication.accessToken
            },
            data: toJS(localStore)
        };

        defaultAxios(options).then(response => {
            console.log(response);
            if(response.status === 200) {
                history.replace({pathname: "/site/place"});
            }
        }).catch(reason => {
            console.error(reason);
        });

    };

    const handleCancel = () => history.replace({pathname: "/site/place"});

    const handleSetStartDate = (date) => {
        localStore.startDate = date;
        localStore.startDatetime = date;
    };

    const handleSetEndDate = (date) => {
        localStore.endDate = date;
        localStore.endDatetime = date;
    };

    const [mixtureInformation, setmixtureInformation] = useState('');


    useEffect((props) => {

        const options = {
            // url: process.env.REACT_APP_API_GATEWAY + (`/sites/${query.get("siteCode")}/places/${query.get("placeCode")}/information`),
            url: process.env.REACT_APP_API_CONCRETE + (`/concrete/sites/${query.get("siteCode")}/places/${query.get("placeCode")}/information`),
            method: 'get',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authentication.accessToken
            }
        };

        defaultAxios(options).then(response => {

            const data = response.data;

            const startDatetime                 = data.startDatetime            ;
            const endDatetime                   = data.endDatetime              ;
            const temperatureCrackingType       = data.temperatureCrackingType  ;
            const standardCrackFactor           = data.standardCrackFactor      ;
            const externalRestrictionFactor     = data.externalRestrictionFactor;
            const mixtureInformation            = data.mixtureInformation       ;
            const siteName                      = data.siteName                 ;
            const placeName                     = data.placeName                ;
            const crackDescription              = data.crackDescription         ;

            localStore.startDate = new Date(startDatetime);
            localStore.startDatetime = new Date(startDatetime);
            localStore.endDate = new Date(endDatetime);
            localStore.endDatetime = new Date(endDatetime);
            localStore.temperatureCrackingType = temperatureCrackingType;
            localStore.standardCrackFactor = standardCrackFactor;
            localStore.externalRestrictionFactor = externalRestrictionFactor;
            localStore.siteName = siteName;
            localStore.placeName = placeName;
            localStore.crackDescription = crackDescription;

            setmixtureInformation(mixtureInformation);

        
        }).catch(reason => {
            console.error(reason);
        });

    }, []);




    return useObserver(() => (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <CardHeader title="설정 관리"/>
                <Divider/>
                <CardContent className={classes.card}>
                    <TableContainer>
                        <Table aria-label={"table"}>
                            <TableBody>
                                <TableRow>
                                    <TableCell align={"left"}>재련 기간</TableCell>
                                    <TableCell align={"left"}>
                                        <Grid container>
                                            <DatePickerRange store={localStore} onStartDateChange={handleSetStartDate} onEndDateChange={handleSetEndDate}/>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"left"}>관리 기준 균열 지수</TableCell>
                                    <TableCell align={"left"}>
                                        <OutlinedInput margin={"dense"} inputProps={{'aria-label': 'criteria'}} value={localStore.standardCrackFactor} onChange={handleInputChange}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"left"}>온도 균열 발생 유형</TableCell>
                                    <TableCell align={"left"}>
                                        <SelectTemperatureTypes store={localStore}/>
                                    </TableCell>
                                </TableRow>
                                {/* {localStore.valueType === 'EXTERNAL' && <TableRow> */}
                                {localStore.temperatureCrackingType === 'EXTERNAL' && <TableRow>
                                    <TableCell align={"left"}>외부 구속 계수</TableCell>
                                    <TableCell align={"left"}>
                                        <RadioGroup aria-label="outdoor" name="outdoor" value={localStore.externalRestrictionFactor} onChange={handleRadioChange}>
                                            <FormControlLabel value="0.5" control={<Radio/>} label="비교적 연한 암반 위에 콘크리트를 칠 때 : 0.5"/>
                                            <FormControlLabel value="0.65" control={<Radio/>} label="중간 정도의 단단한 암반 위에 콘크리트를 칠 때 : 0.65"/>
                                            <FormControlLabel value="0.8" control={<Radio/>} label="경암 위에 콘크리트를 칠 때 : 0.8"/>
                                            <FormControlLabel value="0.6" control={<Radio/>} label="이미 경화된 콘크리트 위에 칠 때 : 0.6"
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>}
                                <TableRow>
                                    <TableCell align={"left"}>설명</TableCell>
                                    <TableCell align={"left"}>
                                        <img src={process.env.PUBLIC_URL + "/images/du.png"} alt={"공식"}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"left"} colSpan={2}>
                                        <TextareaAutosize
                                            style={{width: '50vw'}}
                                            defaultValue={mixtureInformation}
                                            onChange={handleTextareaChange}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button type={"submit"} variant={"contained"} color={"primary"}>저장</Button>
                    <Button type={"button"} variant={"contained"} onClick={handleCancel}>취소</Button>
                </CardActions>
            </form>
        </Paper>
    ));
};

export const SettingDetails = () => {
    return (
        <>
            <Details/>
        </>
    )
};

export const SettingRegistration = () => {
    return (<Details/>)
};