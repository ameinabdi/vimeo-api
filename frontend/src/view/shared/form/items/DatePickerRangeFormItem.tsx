import { DatePicker, Form } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import { useFormContext } from 'react-hook-form';

const DatePickerRangeFormItem = (props) => {
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
      help={errorMessage || hint}
      required={required}
    >
      <DatePicker.RangePicker
        name={name}
        onChange={(value) => {
          setValue(name, value, { shouldValidate: true });
          props.onChange && props.onChange(value);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        value={watch(name)}
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

DatePickerRangeFormItem.defaultProps = {
  layout: null,
  showTime: false,
};

DatePickerRangeFormItem.propTypes = {
  showTime: PropTypes.bool,
  required: PropTypes.bool,

  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  layout: PropTypes.object,
};

export default DatePickerRangeFormItem;
