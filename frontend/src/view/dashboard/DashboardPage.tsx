import { Card, Col, Row } from 'antd';
import React from 'react';
import { i18n } from 'src/i18n';
import DashboardBarChart from 'src/view/dashboard/DashboardBarChart';
import DashboardDoughnutChart from 'src/view/dashboard/DashboardDoughnutChart';
import DashboardHorizontalBarChart from 'src/view/dashboard/DashboardHorizontalBarChart';
import DashboardLineChart from 'src/view/dashboard/DashboardLineChart';
import DashboardMixChartOne from 'src/view/dashboard/DashboardMixChartOne';
import DashboardMixChartTwo from 'src/view/dashboard/DashboardMixChartTwo';
import DashboardPolarChart from 'src/view/dashboard/DashboardPolarChart';
import DashboardRadarChart from 'src/view/dashboard/DashboardRadarChart';

const DashboardPage = (props) => {
  const twoColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style: {
      marginBottom: 24,
    },
  };
  const threeColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    style: {
      marginBottom: 24,
    },
  };

  return (
    <>
      <Row gutter={24}>
        <Col {...threeColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardDoughnutChart />
          </Card>
        </Col>
        <Col {...threeColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardMixChartTwo />
          </Card>
        </Col>
        <Col {...threeColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardBarChart />
          </Card>
        </Col>

        <Col {...twoColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardMixChartOne />
          </Card>
        </Col>

        <Col {...twoColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardPolarChart />
          </Card>
        </Col>

        <Col {...threeColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardHorizontalBarChart />
          </Card>
        </Col>
        <Col {...threeColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardLineChart />
          </Card>
        </Col>
        <Col {...threeColumnsResponsiveProps}>
          <Card
            bodyStyle={{
              padding: 8,
            }}
          >
            <DashboardRadarChart />
          </Card>
        </Col>
      </Row>
      <p
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'grey',
        }}
      >
        {i18n('dashboard.message')}
      </p>
    </>
  );
};

export default DashboardPage;
