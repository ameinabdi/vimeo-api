import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const ImagesListView = (props) => {
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

  if (
    !valueAsArray().length ||
    !valueAsArray()[0].downloadUrl
  ) {
    return (
      <Avatar
        shape="square"
        size="large"
        icon={props.icon}
      />
    );
  }

  const src = valueAsArray()[0].downloadUrl;
  return <Avatar shape="square" size="large" src={src} />;
};

ImagesListView.propTypes = {
  src: PropTypes.any,
  value: PropTypes.any,
};

export default ImagesListView;
