import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Card } from 'antd';


const PieChart = () => {
  const PieChart = useRef(null)

  useEffect(() => {
    const myChart = echarts.init(PieChart.current, 'dark')
    myChart.setOption({
      backgroundColor: 'transparent',
      title: {
        text: 'Type of article sent'
        // textStyle: {
        //   color: 'white'
        // }
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'News' },
            { value: 310, name: 'Feature' },
            { value: 235, name: 'Education' },
            { value: 400, name: 'Travel' }
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'lightgray'
          },
          labelLine: {
            lineStyle: {
              color: 'lightgray'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function () {
            return Math.random() * 200;
          }
        }
      ]
    })
    return () => {
      myChart.dispose()
    }
  }, [])
  return (
    <Card hoverable style={{
      width: 300,
      height: 300,
    }}>
      <section className='pieChart' ref={PieChart}></section>
    </Card>
  )
}

export default PieChart