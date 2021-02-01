import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/tenant/form/tenantFormActions';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TenantForm from 'src/view/tenant/form/TenantForm';
import { useRouteMatch } from 'react-router-dom';
import Spinner from 'src/view/shared/Spinner';

const TenantFormPage = (props) => {
  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, isEditing, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  const title = isEditing
    ? i18n('tenant.edit.title')
    : i18n('tenant.new.title');

  return (
    <>
      <Breadcrumb
        header
        items={[[i18n('tenant.menu'), '/tenant'], [title]]}
      />

      <ContentWrapper>
        <PageTitle>{title}</PageTitle>
        {initLoading && <Spinner />}
        {dispatched && !initLoading && (
          <TenantForm
            saveLoading={saveLoading}
            record={record}
            isEditing={isEditing}
            onSubmit={doSubmit}
            onCancel={() => getHistory().push('/tenant')}
          />
        )}
      </ContentWrapper>
    </>
  );
};

export default TenantFormPage;
