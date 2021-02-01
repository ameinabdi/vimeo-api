import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/lessons/importer/lessonsImporterActions';
import fields from 'src/modules/lessons/importer/lessonsImporterFields';
import selectors from 'src/modules/lessons/importer/lessonsImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const LessonsImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.lessons.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.lessons.menu'), '/lessons'],
          [i18n('entities.lessons.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.lessons.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default LessonsImportPage;
