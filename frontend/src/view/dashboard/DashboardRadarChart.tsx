import React from 'react';
import { Radar } from 'react-chartjs-2';
import { i18n } from 'src/i18n';

const data = {
  labels: [
    i18n('dashboard.charts.eating'),
    i18n('dashboard.charts.drinking'),
    i18n('dashboard.charts.sleeping'),
    i18n('dashboard.charts.designing'),
    i18n('dashboard.charts.coding'),
    i18n('dashboard.charts.cycling'),
    i18n('dashboard.charts.running'),
  ],
  datasets: [
    {
      label: `${i18n('dashboard.charts.grey')}`,
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: `${i18n('dashboard.charts.red')}`,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const options = {
  scale: {
    display: false,
  },
};

const DashboardRadarChart = (props) => {
  return <Radar data={data} options={options} />;
};

export default DashboardRadarChart;
