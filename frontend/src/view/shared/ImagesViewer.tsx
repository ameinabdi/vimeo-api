import { Carousel } from 'antd';
import React from 'react';
import { i18n } from 'src/i18n';
import ImagesViewerWrapper from 'src/view/shared/styles/ImagesViewerWrapper';

const ImagesViewer = (props) => {
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
    return <p>{i18n('imagesViewer.noImage')}</p>;
  }

  return (
    <ImagesViewerWrapper>
      <Carousel autoplay vertical effect="fade">
        {valueAsArray().map((item) => {
          return (
            <img
              key={item.id}
              src={item.downloadUrl}
              alt={item.name}
            />
          );
        })}
      </Carousel>
    </ImagesViewerWrapper>
  );
};

export default ImagesViewer;
