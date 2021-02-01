import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/importer/userImporterActions';
import fields from 'src/modules/user/importer/userImporterFields';
import selectors from 'src/modules/user/importer/userImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const Importer = importerHoc(
  selectors,
  actions,
  fields,
  i18n('user.importer.hint'),
);

const UserImportPage = (props) => {
  return (
    <>
      <Breadcrumb
        header
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('user.menu'), '/user'],
          [i18n('user.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('user.importer.title')}</PageTitle>
        <Importer />
      </ContentWrapper>
    </>
  );
};
export default UserImportPage;
