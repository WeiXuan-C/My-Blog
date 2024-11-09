import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Card } from 'antd';


const BarChart = () => {
    const barChart = useRef(null)

    useEffect(() => {
        const myChart = echarts.init(barChart.current, 'dark')
        myChart.setOption({
            title: {
                text: 'Article Views'
            },
            backgroundColor: 'rgb(83, 79, 79)',
            xAxis: {
                type: 'category',
                data: ['news', 'feature', 'edu', 'travel',]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        })
    })
    return (
        <div>
            <Card hoverable style={{
                width: 320,
                height: 270,
            }}>
                <section className='barChart' ref={barChart}></section>
            </Card>
        </div>
    )
}

export default BarChart