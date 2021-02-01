import React from 'react';
import { Bar } from 'react-chartjs-2';
import { i18n } from 'src/i18n';

const data = {
  labels: [
    `${i18n('dashboard.charts.day')} 1`,
    `${i18n('dashboard.charts.day')} 2`,
    `${i18n('dashboard.charts.day')} 3`,
    `${i18n('dashboard.charts.day')} 4`,
    `${i18n('dashboard.charts.day')} 5`,
  ],
  datasets: [
    {
      label: i18n('dashboard.charts.red'),
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 82],
    },
  ],
};

const options = {
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: true,
      },
    ],
  },
};

const DashboardBarChart = (props) => {
  return (
    <Bar
      data={data}
      options={options}
      width={100}
      height={50}
    />
  );
};

export default DashboardBarChart;
