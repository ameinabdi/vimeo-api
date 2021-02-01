import { i18n } from 'src/i18n';
import actions from 'src/modules/tenant/invitation/tenantInvitationActions';
import selectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import { Button } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  id: yupFormSchemas.string(i18n('tenant.fields.tenantId')),
});

function TenantSelectForm(props) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const invitedTenants = useSelector(
    authSelectors.selectInvitedTenants,
  );

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const [initialValues] = useState({
    id: invitedTenants[0].id,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = ({ id }) => {
    const tenantUserInvitation = currentUser.tenants.find(
      (tenantUser) => tenantUser.tenant.id === id,
    );

    dispatch(
      actions.doAccept(
        tenantUserInvitation.invitationToken,
      ),
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SelectFormItem
          name="id"
          placeholder={i18n('tenant.fields.tenantId')}
          size="large"
          options={invitedTenants.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          layout={null}
        />

        <Button
          style={{ marginTop: '16px' }}
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
          {i18n('tenant.invitation.accept')}
        </Button>
        <Button
          style={{ marginTop: '16px' }}
          htmlType="button"
          block
          size="large"
          onClick={props.onViewToggle}
        >
          {i18n('tenant.new.title')}
        </Button>
      </form>
    </FormProvider>
  );
}

export default TenantSelectForm;
