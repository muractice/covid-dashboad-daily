import React from 'react'
import styles from "./Chart.module.css";
import { Line } from "react-chartjs-2";

import { useSelector } from "react-redux";
import { selectDaily } from "../covidSlice";

const Chart: React.FC = () => {
    const daily = useSelector(selectDaily);
    const dates = daily.map( ( {Date} ) => Date );

//    const daily_confirmed = calc2(daily.map( (data) => data.Confirmed));

    const lineChart = daily[0] && (
        <Line 
        type="line"
        data = {{
            labels: dates.map( (date) => new Date(date).toDateString() ),
            datasets: [
                {
                    // data: daily.map( (data) => data.Confirmed),
                    // data: daily_confirmed,
                    data: calc2(daily.map( (data) => data.Confirmed)),
                    label: "Infected",
                    borderColor: "#3333ff",
                    showLine: false,
                },
                // {
                //     data: daily_recovered,
                //     // data: daily.map( (data) => data.Recovered),
                //     label: "Recovered",
                //     borderColor: "green",
                //     showLine: false,
                // },
                // {
                //     // data: daily.map( (data) => data.Deaths ),
                //     data: daily_dead,
                //     label: "Dead",
                //     borderColor: "#ff3370",
                //     showLine: false,
                // }
            ],
        }}
        />
    );

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

const calc2 = function(array:number[]) {
    let diff_array = [array.shift()];
    array.forEach(function(e:number,index:number,array:number[]) {
        diff_array[index + 1] = e - array[index - 1];
        }
    )
    return diff_array;
}

export default Chart
