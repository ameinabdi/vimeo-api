import { Modal } from 'antd';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import UserService from 'src/modules/user/userService';
import UserNewForm from 'src/view/user/new/UserNewForm';

const UserNewFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      await UserService.create(data);
      const { rows } = await UserService.fetchUsers(
        {
          email: data.emails[0],
        },
        null,
        1,
        0,
      );

      props.onSuccess(rows[0]);
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
      title={i18n('user.new.titleModal')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <UserNewForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
        single
      />
    </Modal>
  );
};

export default UserNewFormModal;
