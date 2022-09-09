import React from "react";
import { useRecoilState } from "recoil"
import { buttonLeftCountAtom } from "../../state/buttonLeftCount"
import { buttonRightCountAtom } from "../../state/buttonRightCount"
import { buttonTotalCountAtom } from "../../state/buttonTotalCount"

// import { deleteDoc, doc, updateDoc, collection } from "firebase/firestore";
// import { firebaseApp } from "../../firebase/firebase.config";

import ChartData from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Bar } from 'react-chartjs-2';
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

ChartData.register(CategoryScale, ChartjsPluginStacked100);

const Chart = () => {

    // ButtonState
    const [buttonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const [buttonRightCount] = useRecoilState(buttonRightCountAtom);

    // 比率計算
    let totalNum = buttonLeftCount + buttonRightCount
    let leftNum = buttonLeftCount / ( totalNum ) * 100
    let rightNum = buttonRightCount / ( totalNum ) * 100

    /**
     * 任意の桁で四捨五入する関数
     * value 四捨五入する数値
     * base どの桁で四捨五入するか（10→10の位、0.1→小数第１位）
     * 四捨五入した値
     */
    // 小数点以下切り捨ての関数
    function calc(value, base) {
        return Math.round(value * base) / base;
    }
    
    let calcLeft =  calc(leftNum, 1)
    let calcRight = calc(rightNum, 1)

    const data = {
        labels: [""],
        datasets: [
            { 
                label: "テナジー",
                data: [buttonLeftCount],
                backgroundColor: "rgba(244, 143, 177, 0.6)",
            },
            { 
                label: "ディグニクス", 
                data: [buttonRightCount], 
                backgroundColor: "rgba(169, 206, 236, 1)",
            },
        ],
    }

    const options = {
        indexAxis: 'y',
        scales: {
            y: {
                // y軸のガイドライン非表示
                display: false,
                // 帯グラフ設定
                stacked: true,
            },
            x: {
                // x軸のガイドライン非表示
                display: false,
                // 帯グラフ設定
                stacked: true,
            }
        },
        plugins: {
            legend: { 
                display: false
            },
            stacked100: { enable: true, replaceTooltipLabel: false },
        },
    }

    return (
        <div className="chart">
            <ul className="chart-num">
                <li className="chart-num-right">{calcRight}<span className="chart-num-label">%</span></li>
                <li className="chart-num-left">{calcLeft}<span className="chart-num-label">%</span></li>
            </ul>
            <Bar
                data={data} options={options}
            />
        </div>
    );
};

export default Chart;
