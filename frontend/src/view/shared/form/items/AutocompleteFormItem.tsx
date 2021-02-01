import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import unionBy from 'lodash/unionBy';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { i18n } from 'src/i18n';
import FormErrors from 'src/view/shared/form/formErrors';
import { useDebouncedCallback } from 'use-debounce';
import { useFormContext } from 'react-hook-form';

const AUTOCOMPLETE_SERVER_FETCH_SIZE = 100;

const AutocompleteFormItem = (props) => {
  const {
    errors,
    watch,
    setValue,
    register,
    formState: { touched, isSubmitted },
  } = useFormContext();

  const {
    label,
    name,
    hint,
    layout,
    size,
    placeholder,
    autoFocus,
    externalErrorMessage,
    defaultActiveFirstOption,
    allowClear,
    mode,
    required,

    fetchFn,
    mapper,
  } = props;

  const originalValue = watch(name);

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const [
    serverSideDataSource,
    setServerSideDataSource,
  ] = useState<Array<any>>([]);

  const [
    inMemoryDataSource,
    setInMemoryDataSource,
  ] = useState<Array<any>>([]);

  const [fullDataSource, setFullDataSource] = useState<
    Array<any>
  >([]);
  const [loading, setLoading] = useState(false);

  const currentQuery = useRef('NOT_INITIALIZED');

  useEffect(() => {
    mergeValueToOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalValue]);

  useEffect(() => {
    handleSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mergeValueToOptions = () => {
    if (!originalValue) {
      return;
    }

    let valueAsArray =
      (mode === 'multiple'
        ? originalValue
        : [originalValue]) || [];

    valueAsArray = valueAsArray
      .filter(Boolean)
      .map(mapper.toAutocomplete)
      .map((item) => ({
        id: item.key,
        label: item.label,
      }));

    setInMemoryDataSource((inMemoryDataSource) =>
      unionBy(valueAsArray, inMemoryDataSource, 'id'),
    );

    setServerSideDataSource((serverSideDataSource) =>
      unionBy(valueAsArray, serverSideDataSource, 'id'),
    );
  };

  const dataSource = props.inMemoryFilter
    ? inMemoryDataSource
    : serverSideDataSource;

  const prioritizeFromDataSource = (selected) => {
    return (
      (dataSource || []).find(
        (item) => item.id === selected.key,
      ) || selected
    );
  };

  const valueMultiple = () => {
    if (originalValue) {
      return originalValue.map((value) =>
        mapper.toAutocomplete(
          prioritizeFromDataSource(value),
        ),
      );
    }

    return [];
  };

  const valueOne = () => {
    if (originalValue) {
      return mapper.toAutocomplete(
        prioritizeFromDataSource(originalValue),
      );
    }

    // Antd requires undefined on the select
    return undefined;
  };

  const value =
    mode === 'multiple' ? valueMultiple() : valueOne();

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setValue(name, [], { shouldValidate: true });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setValue(name, newValue, { shouldValidate: true });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setValue(name, null, { shouldValidate: true });
      props.onChange && props.onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setValue(name, newValue, { shouldValidate: true });
    props.onChange && props.onChange(newValue);
  };

  const handleSearch = async (value) => {
    if (props.inMemoryFilter) {
      return handleInMemorySearch(value);
    }

    return handleServerSearch(value);
  };

  const handleInMemorySearch = async (value) => {
    let _fullDataSource = fullDataSource;

    if (!_fullDataSource || !_fullDataSource.length) {
      _fullDataSource = await fetchAllResults();
    }

    setInMemoryDataSource(
      _fullDataSource.filter((item) =>
        String(item.label || '')
          .toLowerCase()
          .includes(String(value || '').toLowerCase()),
      ),
    );
    setLoading(false);
  };

  const fetchAllResults = async () => {
    setLoading(true);

    try {
      const results = await fetchFn();
      setFullDataSource(results);
      setLoading(false);
      return results;
    } catch (error) {
      console.error(error);
      setFullDataSource([]);
      setLoading(false);
      return [];
    }
  };

  const handleServerSearch = async (value) => {
    if (value === currentQuery.current) {
      return;
    }

    currentQuery.current = value;
    setLoading(true);

    try {
      const serverSideDataSource = await fetchFn(
        value,
        AUTOCOMPLETE_SERVER_FETCH_SIZE,
      );

      if (currentQuery.current === value) {
        setLoading(false);
        setServerSideDataSource(serverSideDataSource);
      }
    } catch (error) {
      console.error(error);

      if (currentQuery.current === value) {
        setLoading(false);
        setServerSideDataSource([]);
      }
    }
  };

  const debouncedSearch = useDebouncedCallback(
    handleSearch,
    300,
  );

  useEffect(
    () => () => {
      debouncedSearch.flush();
    },
    [debouncedSearch]
  );

  const options = dataSource
    .filter((item) => Boolean(item.id))
    .map((d) => (
      <Select.Option key={d.id} value={d.id}>
        {d.label}
      </Select.Option>
    ));

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
      required={required}
      validateStatus={errorMessage ? 'error' : 'success'}
      help={
        loading
          ? i18n('autocomplete.loading')
          : errorMessage || hint
      }
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <Select
          id={name}
          showSearch
          mode={mode}
          labelInValue={true}
          showArrow={false}
          filterOption={false}
          notFoundContent={null}
          onChange={handleSelect}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          value={value}
          onSearch={debouncedSearch.callback}
          placeholder={placeholder || undefined}
          size={size || undefined}
          autoFocus={autoFocus || false}
          defaultActiveFirstOption={
            defaultActiveFirstOption
          }
          allowClear={allowClear}
        >
          {options}
        </Select>

        {props.showCreate && props.hasPermissionToCreate ? (
          <Button
            style={{
              marginLeft: '16px',
              flexShrink: 0,
            }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={props.onOpenModal}
            htmlType="button"
          />
        ) : null}
      </div>
    </Form.Item>
  );
};

AutocompleteFormItem.defaultProps = {
  layout: null,
  defaultActiveFirstOption: true,
  allowClear: true,
  mode: 'default',
  required: false,

  inMemoryFilter: false,
};

AutocompleteFormItem.propTypes = {
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultActiveFirstOption: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  allowClear: PropTypes.bool,
  showCreate: PropTypes.bool,
  hasPermissionToCreate: PropTypes.bool,

  inMemoryFilter: PropTypes.bool,
};

export default AutocompleteFormItem;
