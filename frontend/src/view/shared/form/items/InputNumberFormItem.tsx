import { Form, InputNumber } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';

const InputNumberFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    size,
    placeholder,
    autoFocus,
    autoComplete,
    prefix,
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

  return (
    <Form.Item
      {...layout}
      label={label}
      validateStatus={errorMessage ? 'error' : 'success'}
      required={required}
      help={errorMessage || hint}
    >
      <InputNumber
        style={{
          width: '100%',
        }}
        id={name}
        name={name}
        onChange={(value) => {
          setValue(name, value, { shouldValidate: true });
          props.onChange && props.onChange(value);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        value={watch(name)}
        size={size || undefined}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || false}
        autoComplete={autoComplete || undefined}
        prefix={prefix || undefined}
      />
    </Form.Item>
  );
};

InputNumberFormItem.defaultProps = {
  layout: null,
  required: false,
};

InputNumberFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default InputNumberFormItem;
