import { Form } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';

const ImagesFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    storage,
    max,
    required,

    externalErrorMessage,
  } = props;

  const {
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
    register,
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
      required={required}
      validateStatus={errorMessage ? 'error' : 'success'}
      help={formHelperText}
    >
      <ImagesUploader
        storage={storage}
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

ImagesFormItem.defaultProps = {
  layout: null,
  max: undefined,
  required: false,
};

ImagesFormItem.propTypes = {
  storage: PropTypes.object.isRequired,
  max: PropTypes.number,

  required: PropTypes.bool,

  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  layout: PropTypes.object,
};

export default ImagesFormItem;
