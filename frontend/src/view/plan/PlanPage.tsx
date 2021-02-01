import { Col, Row } from 'antd';
import React from 'react';
import { i18n } from 'src/i18n';
import Plans from 'src/security/plans';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PlanCardFree from 'src/view/plan/PlanCardFree';
import PlanCardPaid from 'src/view/plan/PlanCardPaid';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function PlanPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('plan.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('plan.title')}</PageTitle>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={8}>
            <PlanCardFree />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <PlanCardPaid plan={Plans.values.growth} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <PlanCardPaid plan={Plans.values.enterprise} />
          </Col>
        </Row>
      </ContentWrapper>
    </>
  );
}

export default PlanPage;
