import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const EChartsPieChart = () => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>ECharts Pie Chart</title>
      <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
      <style>
        #main {
          width: 100%;
          height: 1000px;
        }
      </style>
    </head>
    <body>
      <div id="main"></div>
      <script>
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom, 'dark');
        var option;

        option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        };

        option && myChart.setOption(option);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView style={styles.webview} originWhitelist={['*']} source={{ html }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default EChartsPieChart;
