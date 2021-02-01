import { Form, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import { useFormContext } from 'react-hook-form';

const SelectFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    size,
    placeholder,
    options,
    mode,
    autoFocus,
    required,
    externalErrorMessage,
    optionFilterProp,
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
      validateStatus={errorMessage ? 'error' : 'success'}
      required={required}
      help={errorMessage || hint}
    >
      <Select
        id={name}
        onChange={(value) => {
          setValue(name, value, { shouldValidate: true });
          props.onChange && props.onChange(value);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        value={originalValue}
        size={size || undefined}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || false}
        mode={mode || undefined}
        optionFilterProp={optionFilterProp || 'children'}
        allowClear
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            title={option.title}
          >
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

SelectFormItem.defaultProps = {
  layout: null,
  required: false,
};

SelectFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  mode: PropTypes.string,
  optionFilterProp: PropTypes.string,
};

export default SelectFormItem;
