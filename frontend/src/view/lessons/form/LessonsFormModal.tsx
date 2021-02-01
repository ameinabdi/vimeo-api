import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import LessonsForm from 'src/view/lessons/form/LessonsForm';
import LessonsService from 'src/modules/lessons/lessonsService';
import Errors from 'src/modules/shared/error/errors';

const LessonsFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await LessonsService.create(data);
      const record = await LessonsService.find(id);
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
      title={i18n('entities.lessons.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <LessonsForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default LessonsFormModal;
