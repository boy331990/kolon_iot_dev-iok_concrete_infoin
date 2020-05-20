import React from 'react';
import DatePicker from "react-datepicker";
import {useObserver} from "mobx-react-lite";
import {TextField} from "@material-ui/core";


export const DatePickerRange = props => {
    const {store, onStartDateChange, onEndDateChange} = props;


    return useObserver(() => (
        <>
            <DatePicker selected={store.startDate}
                        name={"startDate"}
                        onChange={date => onStartDateChange(date)}
                        selectsStart
                        startDate={store.startDate}
                        endDate={store.endDate}
                        customInput={<TextField variant={"outlined"} margin={"dense"} label={"시작일"}/>}
                        dateFormat="yyyy-MM-dd"/>
            <DatePicker selected={store.endDate}
                        name={"endDate"}
                        onChange={date => onEndDateChange(date)}
                        selectsEnd
                        startDate={store.startDate}
                        endDate={store.endDate}
                        customInput={<TextField variant={"outlined"} margin={"dense"} label={"종료일"}/>}
                        dateFormat="yyyy-MM-dd"/>
        </>
    ))
};