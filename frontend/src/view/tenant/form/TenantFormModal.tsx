import { Modal } from 'antd';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import TenantService from 'src/modules/tenant/tenantService';
import TenantForm from 'src/view/tenant/form/TenantForm';

const TenantFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await TenantService.create(data);
      const record = await TenantService.find(id);
      props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      style={{ top: 24 }}
      title={i18n('tenant.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <TenantForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default TenantFormModal;
