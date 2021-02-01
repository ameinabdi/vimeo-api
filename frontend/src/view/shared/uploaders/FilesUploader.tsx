import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';

const FilesUploader = (props) => {
  const [loading, setLoading] = useState(false);

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
      type: item.type,
      size: item.size,
    }));
  };

  const handleSuccess = (file) => {
    setLoading(false);
    props.onChange([...value(), file]);
  };

  const handleError = (error) => {
    console.error(error);
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
        formats: props.formats,
      });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const formats = () => {
    const { schema } = props;

    if (schema && schema.formats) {
      return schema.formats.join(', ');
    }

    return undefined;
  };

  const { max, readonly } = props;
  const uploadButton = (
    <Button>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      {i18n('fileUploader.upload')}
    </Button>
  );
  return (
    <Upload
      accept={formats()}
      fileList={fileList()}
      disabled={readonly}
      customRequest={(request) => {
        FileUploader.uploadFromRequest(
          request,
          {
            storage: props.storage,
            formats: props.formats,
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
      beforeUpload={validate}
    >
      {readonly || (max && fileList().length >= max)
        ? null
        : uploadButton}
    </Upload>
  );
};

FilesUploader.propTypes = {
  readonly: PropTypes.bool,
  max: PropTypes.number,
  storage: PropTypes.object,
  formats: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default FilesUploader;
