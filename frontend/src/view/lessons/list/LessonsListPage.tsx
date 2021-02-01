import React from 'react';
import { i18n } from 'src/i18n';
import LessonsListFilter from 'src/view/lessons/list/LessonsListFilter';
import LessonsListTable from 'src/view/lessons/list/LessonsListTable';
import LessonsListToolbar from 'src/view/lessons/list/LessonsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const LessonsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.lessons.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.lessons.list.title')}
        </PageTitle>

        <LessonsListToolbar />
        <LessonsListFilter />
        <LessonsListTable />
      </ContentWrapper>
    </>
  );
};

export default LessonsListPage;
