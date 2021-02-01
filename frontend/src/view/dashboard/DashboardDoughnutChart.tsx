import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { i18n } from 'src/i18n';

const data = {
  labels: [
    i18n('dashboard.charts.red'),
    i18n('dashboard.charts.blue'),
    i18n('dashboard.charts.yellow'),
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    },
  ],
};

const DashboardDoughnutChart = (props) => {
  return <Doughnut data={data} />;
};

export default DashboardDoughnutChart;
