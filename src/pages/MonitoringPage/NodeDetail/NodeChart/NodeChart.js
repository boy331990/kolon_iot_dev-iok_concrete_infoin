import React from 'react';
import Chart from 'react-apexcharts';


export const NodeChart = props => {
    const {data} = props;


    const state = {
        options: {
            chart: {
                id: "temperature"
            },
            stroke: {
                width: [1, 1, 1, 1]
            },
            xaxis: {
                type: 'category',
                categories: data && data.map(item => item.baseTime)
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + '℃';
                    }
                }
            }
        },
        series: [
            {
                name: "상부",
                type: "line",
                data: data && data.map(item => item.temperature1)
            },
            {
                name: "중부",
                type: "line",
                data: data && data.map(item => item.temperature2)
            },
            {
                name: "하부",
                type: "line",
                data: data && data.map(item => item.temperature3)
            },
            {
                name: "외기",
                type: "line",
                data: data && data.map(item => item.temperature4)
            }
        ],
        noData: {
            text: "Loading..."
        }
    };

    return (
        <Chart
            options={state.options}
            series={state.series}
            type={"line"}
            height={"380"}
        />
    )
};
