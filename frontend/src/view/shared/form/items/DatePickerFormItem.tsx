import { DatePicker, Form } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import { useFormContext } from 'react-hook-form';

const DatePickerFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    autoFocus,
    showTime,
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

  return (
    <Form.Item
      {...layout}
      label={label}
      required={required}
      validateStatus={errorMessage ? 'error' : 'success'}
      help={errorMessage || hint}
    >
      <DatePicker
        onChange={(value) => {
          setValue(name, value, { shouldValidate: true });
          props.onChange && props.onChange(value);
        }}
        value={watch(name)}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        autoFocus={autoFocus || false}
        style={{
          width: '100%',
        }}
        showTime={
          showTime
            ? {
                format: 'HH:mm',
              }
            : undefined
        }
        format={showTime ? 'YYYY-MM-DD HH:mm' : undefined}
      />
    </Form.Item>
  );
};

DatePickerFormItem.defaultProps = {
  layout: null,
  showTime: false,
  required: false,
};

DatePickerFormItem.propTypes = {
  showTime: PropTypes.bool,

  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  layout: PropTypes.object,
  required: PropTypes.bool,
};

export default DatePickerFormItem;
