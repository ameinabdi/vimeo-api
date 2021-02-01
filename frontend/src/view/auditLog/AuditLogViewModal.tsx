import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { i18n } from 'src/i18n';
import JsonHighlighter from 'src/view/shared/JsonHighlighter';

const AuditLogViewModal = (props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      title={i18n('auditLog.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
    >
      <JsonHighlighter code={props.code} />
    </Modal>
  );
};

AuditLogViewModal.propTypes = {
  visible: PropTypes.bool,
  code: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};

export default AuditLogViewModal;
