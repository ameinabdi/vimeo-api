import { Button, Form } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import {
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(
    i18n('user.fields.oldPassword'),
    {
      required: true,
    },
  ),
  newPassword: yupFormSchemas.string(
    i18n('user.fields.newPassword'),
    {
      required: true,
    },
  ),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n('user.fields.newPasswordConfirmation'), {
      required: true,
    })
    .oneOf(
      [yup.ref('newPassword'), null],
      i18n('auth.passwordChange.mustMatch'),
    ),
});

const PasswordChangeForm = (props) => {
  const dispatch = useDispatch();
  const saveLoading = useSelector(
    selectors.selectLoadingPasswordChange,
  );

  const [initialValues] = useState(() => ({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(
      actions.doChangePassword(
        values.oldPassword,
        values.newPassword,
      ),
    );
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormItem
            name="oldPassword"
            label={i18n('user.fields.oldPassword')}
            required={true}
            type="password"
            layout={formItemLayout}
          />
          <InputFormItem
            name="newPassword"
            label={i18n('user.fields.newPassword')}
            required={true}
            type="password"
            layout={formItemLayout}
          />
          <InputFormItem
            name="newPasswordConfirmation"
            label={i18n(
              'user.fields.newPasswordConfirmation',
            )}
            required={true}
            type="password"
            layout={formItemLayout}
          />

          <Form.Item
            className="form-buttons"
            {...tailFormItemLayout}
          >
            <Button
              loading={saveLoading}
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined />}
            >
              {i18n('common.reset')}
            </Button>
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default PasswordChangeForm;
