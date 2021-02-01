import React from 'react';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import styled from 'styled-components';

const HideRemoveButtonWrapper = styled.span`
  .anticon-close {
    display: none;
  }
`;

const FilesViewer = (props) => {
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

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <HideRemoveButtonWrapper>
      <FilesUploader readonly value={valueAsArray()} />
    </HideRemoveButtonWrapper>
  );
};

export default FilesViewer;
