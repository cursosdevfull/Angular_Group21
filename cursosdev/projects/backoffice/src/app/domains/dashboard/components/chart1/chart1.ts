import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { series } from "./data"
import { DecimalPipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  colors: string[];
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
};

@Component({
  selector: 'cdev-chart1',
  imports: [NgApexchartsModule],
  templateUrl: './chart1.html',
  styleUrl: './chart1.css'
})
export class Chart1 {
  chartOptions: Partial<ChartOptions>;
  decimalPipe = new DecimalPipe('en-US');

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Incomes',
          data: series.monthDataSeries1.incomes,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#ccc',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: 'straight',
      },
      grid: {
        show: true,
        borderColor: '#334155',
        padding: {
          top: 10,
          bottom: -40,
          left: 0,
          right: 0,
        },
        position: 'back',
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      colors: ['#818cf8'],
      title: {
        text: 'Incomes daily',
        align: 'left',
        style: {
          fontSize: '20px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'normal',
          color: 'whitesmoke',
        },
      },
      subtitle: {
        text: 'Total by day (PEN)',
        align: 'left',
        style: {
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'normal',
          color: 'whitesmoke',
        },
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: 'category',
        labels: {
          offsetY: -20,
          style: {
            colors: '#cbd5e1',
          },
        },
      },
      yaxis: {
        opposite: true,
        labels: {
          formatter: (value) => this.decimalPipe.transform(value, '1.2-2') || '',
        },
      },
      legend: {
        horizontalAlign: 'left',
      },
      tooltip: {
        theme: 'dark',
      },
      fill: {
        colors: ['#312E81'],
      },
      markers: {
        size: 5,
        colors: ['#000524'],
        strokeColors: '#00BAEC',
        strokeWidth: 3,
      },
    };
  }
}
