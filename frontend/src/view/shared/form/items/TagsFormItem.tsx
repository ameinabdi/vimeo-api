import { Form, Select } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';

const TagsFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    placeholder,
    autoFocus,
    notFoundContent,
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

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const originalValue = watch(name);

  return (
    <Form.Item
      {...layout}
      label={label}
      validateStatus={errorMessage ? 'error' : 'success'}
      required={required}
      help={errorMessage || hint}
    >
      <Select
        mode="tags"
        style={{
          width: '100%',
        }}
        value={originalValue}
        onChange={(value) => {
          setValue(name, value, { shouldValidate: true });
          props.onChange && props.onChange(value);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        notFoundContent={notFoundContent}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || false}
      />
    </Form.Item>
  );
};

TagsFormItem.defaultProps = {
  layout: null,
  tokenSeparators: [','],
  required: false,
};

TagsFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  notFoundContent: PropTypes.string,
};

export default TagsFormItem;
