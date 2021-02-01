import { Form, InputNumber } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';

const InputNumberRangeFormItem = (props) => {
  const {
    name,
    label,
    hint,
    layout,
    size,
    placeholder,
    autoFocus,
    autoComplete,
    prefix,
    externalErrorMessage,
    required,
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

  const handleStartChanged = (value) => {
    setValue(name, [value, endValue()], { shouldValidate: true });
    props.onChange && props.onChange([value, endValue()]);
  };

  const handleEndChanged = (value) => {
    setValue(name, [startValue(), value], { shouldValidate: true });
    props.onChange && props.onChange([value, startValue()]);
  };

  const startValue = () => {
    if (!originalValue) {
      return null;
    }

    if (Array.isArray(!originalValue)) {
      return null;
    }

    if (!originalValue.length) {
      return null;
    }

    return originalValue[0];
  };

  const endValue = () => {
    if (!originalValue) {
      return null;
    }

    if (Array.isArray(!originalValue)) {
      return null;
    }

    if (originalValue.length < 2) {
      return null;
    }

    return originalValue[1];
  };

  return (
    <Form.Item
      {...layout}
      label={label}
      validateStatus={errorMessage ? 'error' : 'success'}
      required={required}
      help={errorMessage || hint}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'baseline',
        }}
      >
        <InputNumber
          style={{
            width: '100%',
          }}
          id={`${name}Start`}
          onChange={(value) => handleStartChanged(value)}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          value={startValue()}
          size={size || undefined}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || false}
          autoComplete={autoComplete || undefined}
          prefix={prefix || undefined}
        />

        <div
          style={{
            flexShrink: 1,
            marginLeft: '8px',
            marginRight: '8px',
          }}
        >
          ~
        </div>

        <InputNumber
          style={{
            width: '100%',
          }}
          id={`${name}End`}
          onChange={(value) => handleEndChanged(value)}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          value={endValue()}
          size={size || undefined}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || false}
          autoComplete={autoComplete || undefined}
          prefix={prefix || undefined}
        />
      </div>
    </Form.Item>
  );
};

InputNumberRangeFormItem.defaultProps = {
  layout: null,
  required: false,
};

InputNumberRangeFormItem.propTypes = {
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

export default InputNumberRangeFormItem;
