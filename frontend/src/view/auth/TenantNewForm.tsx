import { i18n } from 'src/i18n';
import actions from 'src/modules/tenant/form/tenantFormActions';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from 'antd';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import config from 'src/config';
import { urlfy } from '../shared/urlfy';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import { yupResolver } from '@hookform/resolvers/yup';

const schemaWithUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
  url: yupFormSchemas
    .string(i18n('tenant.fields.tenantUrl'), {
      required: true,
      max: 50,
    })
    .matches(
      /^[a-z0-9][-a-zA-Z0-9]*$/,
      i18n('tenant.validation.url'),
    ),
});

const schemaWithoutUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
});

const schema = tenantSubdomain.isEnabled
  ? schemaWithUrl
  : schemaWithoutUrl;

function TenantNewForm(props) {
  const dispatch = useDispatch();

  const [initialValues] = useState({
    name: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const loading = useSelector(selectors.selectSaveLoading);

  const invitedTenants = useSelector(
    authSelectors.selectInvitedTenants,
  );

  const onSubmit = (values) => {
    dispatch(actions.doCreate(values));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputFormItem
          name="name"
          placeholder={i18n('tenant.fields.tenantName')}
          autoComplete="name"
          size="large"
          layout={null}
          onChange={(value) =>
            // @ts-ignore
            form.setValue('url', urlfy(value))
          }
          autoFocus
        />

        {tenantSubdomain.isEnabled && (
          <InputFormItem
            name="url"
            placeholder={i18n('tenant.fields.tenantUrl')}
            size="large"
            layout={null}
            addonAfter={
              <span style={{ fontWeight: 'bold' }}>
                .{config.frontendUrl.host}
              </span>
            }
          />
        )}

        <Button
          style={{ marginTop: '16px' }}
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
          {i18n('tenant.create.button')}
        </Button>
        {Boolean(invitedTenants.length) && (
          <Button
            style={{ marginTop: '16px' }}
            htmlType="button"
            block
            size="large"
            onClick={props.onViewToggle}
          >
            {i18n('tenant.invitation.view')}
          </Button>
        )}
      </form>
    </FormProvider>
  );
}

export default TenantNewForm;
