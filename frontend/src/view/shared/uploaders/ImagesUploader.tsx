import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal } from 'antd';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import Errors from 'src/modules/shared/error/errors';
import ImagesUploaderWrapper from 'src/view/shared/styles/ImagesUploaderWrapper';
import { i18n } from 'src/i18n';
import {
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const ImagesUploader = (props) => {
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(
    false,
  );
  const [previewImage, setPreviewImage] = useState('');

  const value = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done' as 'done',
      url: item.downloadUrl,
      size: item.size,
      type: item.type,
    }));
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setPreviewVisible(true);
  };

  const handleSuccess = (file) => {
    setLoading(false);
    props.onChange([...value(), file]);
  };

  const handleError = (error) => {
    setLoading(false);
    Errors.showMessage(error);
  };

  const handleRemove = (id) => {
    props.onChange(
      value().filter((item) => item.id !== id),
    );
  };

  const handleChange = (file) => {
    if (!file || !file.file || !file.file.status) {
      return;
    }

    if (file.file.status === 'removed') {
      handleRemove(file.file.uid);
    } else {
      setLoading(true);
    }
  };

  const validate = (file) => {
    try {
      FileUploader.validate(file, {
        storage: props.storage,
        image: true,
      });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const { max } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">
        {i18n('fileUploader.upload')}
      </div>
    </div>
  );
  return (
    <ImagesUploaderWrapper>
      <Upload
        accept="image/*"
        fileList={fileList()}
        listType="picture-card"
        customRequest={(request) => {
          FileUploader.uploadFromRequest(
            request,
            {
              storage: props.storage,
              image: true,
            },
            (file) => {
              handleSuccess(file);
            },
            (error) => {
              handleError(error);
            },
          );
        }}
        onChange={handleChange}
        onPreview={handlePreview}
        beforeUpload={validate}
      >
        {max && fileList().length >= max
          ? null
          : uploadButton}
      </Upload>

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt={previewImage}
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </ImagesUploaderWrapper>
  );
};

ImagesUploader.propTypes = {
  max: PropTypes.number,
  storage: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default ImagesUploader;
