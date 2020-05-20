import React from 'react';
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {EnhancedTableWithoutCheckbox} from "../../../components/molecules";
import {useAxios} from "../../../hooks";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const headCells = [
    {id: "serialNumber", numeric: false, disablePadding: false, label: "노드 번호", hide: true, primary: true},
    {id: "siteName", numeric: false, disablePadding: false, label: "현장명"},
    {id: "placeName", numeric: false, disablePadding: false, label: "장소(구역)"},
    {id: "serialNumber", numeric: false, disablePadding: false, label: "노드 번호"},
    {id: "elapsedTime", numeric: false, disablePadding: false, label: "경과시간"},
    {id: "arriveTime", numeric: false, disablePadding: false, label: "최고온도 도달시간(내부)"},
    {id: "internalTemperature", numeric: false, disablePadding: false, label: "내부온도"},
    {id: "surfaceTemperature", numeric: false, disablePadding: false, label: "상부온도"},
    {id: "type", numeric: false, disablePadding: false, label: "온도균열 발생유형"},
    {id: "crackIndex", numeric: false, disablePadding: false, label: "관리기준 균열지수"},
    {id: "temperatureCrackIndex", numeric: false, disablePadding: false, label: "온도 균열지수"},
    {id: "temperatureDifference", numeric: false, disablePadding: false, label: "ΔTi/ΔT0"},
    {id: "internalAndOutdoorTemperature", numeric: false, disablePadding: false, label: "𝑇𝐸𝑄"},
    {id: "calculation", numeric: false, disablePadding: false, label: "R(외부 구속 계수)"},
    {id: "explanation", numeric: false, disablePadding: false, label: "설명"}
];

export const StateList = () => {
    const history = useHistory();
    const {url} = useRouteMatch();
    const queryString = useQuery();
    const siteCode = queryString.get("siteCode");
    const placeCode = queryString.get("placeCode");

   /* const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_CONCRETE + `/concrete/sites/${siteCode}/places/${placeCode}/information`
    })

    console.log(data);*/

    const data = [
        {
            siteName: "LH세종",
            placeName: "배수지-1",
            serialNumber: "PELION-016e8838535cb60e5f9ce04c00300000",
            elapsedTime: "50hr",
            arriveTime: "30hr",
            internalTemperature: "52.8℃",
            surfaceTemperature: "40.8℃",
            type: "내부구속응력",
            crackIndex: "1.2",
            temperatureCrackIndex: "0.2",
            temperatureDifference: "12℃",
            internalAndOutdoorTemperature: "-",
            calculation: "-",
            explanation: "-"
        },
        {
            siteName: "LH세종",
            placeName: "배수지-1",
            serialNumber: "PELION-016e8838535cb60e5f9ce04c00300000",
            elapsedTime: "50hr",
            arriveTime: "20hr",
            internalTemperature: "45℃",
            surfaceTemperature: "30℃",
            type: "내부구속응력",
            crackIndex: "1.2",
            temperatureCrackIndex: "0.5",
            temperatureDifference: "15℃",
            internalAndOutdoorTemperature: "-",
            calculation: "-",
            explanation: "-"
        },
        {
            siteName: "LH세종",
            placeName: "배수지-1",
            serialNumber: "PELION-016e8838535cb60e5f9ce04c00300000",
            elapsedTime: "50hr",
            arriveTime: "20hr",
            internalTemperature: "52.8℃",
            surfaceTemperature: "40.8℃",
            type: "외부구속응력",
            crackIndex: "1.2",
            temperatureCrackIndex: "0.5",
            temperatureDifference: "15.2℃",
            internalAndOutdoorTemperature: "30℃",
            calculation: "-",
            explanation: "-"
        }
    ];

    const handleClick = value => {
        history.push(`${url}/detail?siteCode=${siteCode}&placeCode=${placeCode}&deviceId=${value}`);
    };

    return (
        <div>
            {data && <EnhancedTableWithoutCheckbox title={"목록"} rows={data} headCells={headCells} orderBy={"serialNumber"} rowClick={handleClick}/>}
        </div>
    );
};