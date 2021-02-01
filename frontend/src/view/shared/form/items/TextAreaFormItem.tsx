import { Form, Input } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';

const TextAreaFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    placeholder,
    autoFocus,
    autoComplete,
    prefix,
    required,
    rows,
    externalErrorMessage,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const originalValue = watch(name);

  useEffect(() => {
    register({ name });
  }, [register, name]);

  return (
    <Form.Item
      {...layout}
      label={label}
      required={required}
      validateStatus={errorMessage ? 'error' : 'success'}
      help={errorMessage || hint}
    >
      <Input.TextArea
        id={name}
        onChange={(event) => {
          setValue(name, event.target.value, { shouldValidate: true });
          props.onChange &&
            props.onChange(event.target.value);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        value={originalValue}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || false}
        autoComplete={autoComplete || undefined}
        prefix={prefix || undefined}
        rows={rows}
      />
    </Form.Item>
  );
};

TextAreaFormItem.defaultProps = {
  layout: null,
  required: false,
  rows: 4,
};

TextAreaFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default TextAreaFormItem;
