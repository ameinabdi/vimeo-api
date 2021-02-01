import PropTypes from 'prop-types';
import React from 'react';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import styled from 'styled-components';
import truncate from 'lodash/truncate';

const HideRemoveButtonWrapper = styled.span`
  .anticon-close {
    display: none;
  }
`;

const FilesListView = (props) => {
  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const valueWithNamesTruncated = () => {
    return valueAsArray().map((value) => ({
      id: value.id,
      name: truncate(value.name),
      downloadUrl: value.downloadUrl,
    }));
  };

  if (!valueWithNamesTruncated().length) {
    return null;
  }

  return (
    <HideRemoveButtonWrapper>
      <FilesUploader
        readonly
        value={valueWithNamesTruncated()}
      />
    </HideRemoveButtonWrapper>
  );
};

FilesListView.propTypes = {
  value: PropTypes.any,
};

export default FilesListView;
