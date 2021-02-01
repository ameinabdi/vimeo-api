import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TenantListFilter from 'src/view/tenant/list/TenantListFilter';
import TenantListTable from 'src/view/tenant/list/TenantListTable';
import TenantListToolbar from 'src/view/tenant/list/TenantListToolbar';

const TenantListPage = (props) => {
  return (
    <>
      <ContentWrapper style={{ marginTop: 0 }}>
        <PageTitle>{i18n('tenant.list.title')}</PageTitle>

        <TenantListToolbar />
        <TenantListFilter />
        <TenantListTable />
      </ContentWrapper>
    </>
  );
};

export default TenantListPage;
