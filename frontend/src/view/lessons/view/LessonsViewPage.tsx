import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/lessons/view/lessonsViewActions';
import selectors from 'src/modules/lessons/view/lessonsViewSelectors';
import LessonsView from 'src/view/lessons/view/LessonsView';
import LessonsViewToolbar from 'src/view/lessons/view/LessonsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const LessonsPage = (props) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.lessons.menu'), '/lessons'],
          [i18n('entities.lessons.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.lessons.view.title')}
        </PageTitle>

        <LessonsViewToolbar match={match} />

        <LessonsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default LessonsPage;
