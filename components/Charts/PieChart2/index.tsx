import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { SkiaChart } from '@wuba/react-native-echarts';

export default function App() {
  const skiaRef = useRef<any>(null);
  useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    };
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'canvas',
        width: 400,
        height: 400,
      });
      chart.setOption(option);
    }
    return () => {
      chart?.dispose();
    };
  }, []);

  return <SkiaChart ref={skiaRef} />;
}
