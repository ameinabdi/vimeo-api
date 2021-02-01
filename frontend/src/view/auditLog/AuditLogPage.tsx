import React from 'react';
import { i18n } from 'src/i18n';
import AuditLogFilter from 'src/view/auditLog/AuditLogFilter';
import AuditLogTable from 'src/view/auditLog/AuditLogTable';
import AuditLogToolbar from 'src/view/auditLog/AuditLogToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const AuditLogPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('auditLog.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('auditLog.title')}</PageTitle>
        <AuditLogToolbar />
        <AuditLogFilter />
        <AuditLogTable />
      </ContentWrapper>
    </>
  );
};

export default AuditLogPage;
