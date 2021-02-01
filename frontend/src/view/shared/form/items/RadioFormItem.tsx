import { Form } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import { useFormContext } from 'react-hook-form';

const RadioFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    options,
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
      required={required}
      help={formHelperText}
    >
      <RadioGroup
        id={name}
        onChange={(e) => {
          setValue(name, e.target.value, { shouldValidate: true });
          props.onChange && props.onChange(e.target.value);
        }}
        options={options}
        value={watch(name) || ''}
      />
    </Form.Item>
  );
};

RadioFormItem.defaultProps = {
  layout: null,
  required: false,
};

RadioFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default RadioFormItem;
