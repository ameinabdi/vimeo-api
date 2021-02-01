import { Form } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';

const FilesFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    storage,
    formats,
    max,
    required,
    externalErrorMessage,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
  } = useFormContext();

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const formHelperText = errorMessage || hint;

  return (
    <Form.Item
      {...layout}
      label={label}
      validateStatus={errorMessage ? 'error' : 'success'}
      help={formHelperText}
      required={required}
    >
      <FilesUploader
        storage={storage}
        formats={formats}
        value={watch(name)}
        onChange={(value) => {
          setValue(name, value, { shouldValidate: true });
          props.onChange && props.onChange(value);
        }}
        max={max}
      />
    </Form.Item>
  );
};

FilesFormItem.defaultProps = {
  layout: null,
  max: undefined,
  required: false,
};

FilesFormItem.propTypes = {
  storage: PropTypes.object.isRequired,
  formats: PropTypes.any,
  max: PropTypes.number,

  required: PropTypes.bool,

  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  layout: PropTypes.object,
};

export default FilesFormItem;
