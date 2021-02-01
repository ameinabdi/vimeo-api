import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { i18n } from 'src/i18n';
import statuses from 'src/modules/shared/importer/importerStatuses';
import ImporterErrorStatusMessage from 'src/view/shared/importer/styles/ImporterErrorStatusMessage';

const ImporterRowStatus = (props) => {
  const { value, errorMessage } = props;

  if (value === statuses.PENDING) {
    return (
      <Tag
        style={{
          cursor: 'default',
        }}
      >
        {i18n('importer.pending')}
      </Tag>
    );
  }

  if (value === statuses.IMPORTED) {
    return (
      <Tag
        color="green"
        style={{
          cursor: 'default',
        }}
      >
        {i18n('importer.imported')}
      </Tag>
    );
  }

  if (value === statuses.ERROR) {
    return (
      <>
        <Tag color="red">{i18n('importer.error')}</Tag>
        <ImporterErrorStatusMessage>
          {errorMessage}
        </ImporterErrorStatusMessage>
      </>
    );
  }

  return null;
};

ImporterRowStatus.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ImporterRowStatus;
