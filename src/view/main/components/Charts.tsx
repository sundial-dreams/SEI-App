import React, { useState, useEffect } from 'react';
import ReactEchartCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';


import { BarChart, LineChart } from 'echarts/charts';

import { DatasetComponent, TooltipComponent, GridComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// @ts-ignore
import styles from './Charts.scss';

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, LineChart]);

let data: any[] = [];

function randomData(i: number) {
  let value = Math.random();
  return {
    name: 's',
    value: [
      i++,
      Math.round(value)
    ]
  };
}


for (let i = 0; i < 100; i++) {
  data.push(randomData(i));
}

function makeLineChartOption(data: any[]) {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        return params
      },
      axisPointer: {
        animation: false
      }
    },
    grid: {},
    xAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: { color: "#A6B3AD" }
      },
      axisLine: {
        lineStyle: { color: "#A6B3AD" }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLine: {
        lineStyle: { color: "#A6B3AD" }
      },
      splitLine: {
        show: true,
        lineStyle: { color: "#A6B3AD" }
      }
    },
    series: [{
      color: "#385637",
      name: '',
      type: 'line',
      showSymbol: false,
      data: data
    }]
  };
  return option;
}


export function DashboardLineChart() {

  return (
    <ReactEchartCore style={{ height: '100%' }} echarts={echarts} option={makeLineChartOption(data)}/>
  );
}

const data2: any[] = [];

function makeBarChartOption(data: any[]) {

  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [{
      data: [0.1, {
        value: 0.3,
        itemStyle: {
          color: '#a90000'
        }
      }, 0.1, 0.1, 0.2, 0.1, 0.1],
      type: 'bar'
    }]
  };
  return option;
}


export function CardBarChart() {

  return (
    <ReactEchartCore style={{ height: '150%' }} echarts={echarts} option={makeBarChartOption(data2)}/>
  );
}