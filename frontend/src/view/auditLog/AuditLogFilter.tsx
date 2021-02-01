import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auditLog/auditLogActions';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TagsFormItem from 'src/view/shared/form/items/TagsFormItem';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import queryString from 'query-string';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';

const schema = yup.object().shape({
  timestampRange: yupFilterSchemas.datetimeRange(
    i18n('auditLog.fields.timestampRange'),
  ),
  entityNames: yupFilterSchemas.stringArray(
    i18n('auditLog.fields.entityNames'),
  ),
  entityId: yupFilterSchemas.string(
    i18n('auditLog.fields.entityId'),
  ),
  action: yupFilterSchemas.string(
    i18n('auditLog.fields.action'),
  ),
  createdByEmail: yupFilterSchemas.email(
    i18n('auditLog.fields.createdByEmail'),
  ),
});

const emptyValues = {
  timestampRange: [],
  entityNames: [],
  entityId: null,
  action: null,
  createdByEmail: null,
};

const previewRenders = {
  timestampRange: {
    label: i18n('auditLog.fields.timestampRange'),
    render: filterRenders.datetimeRange(),
  },
  entityNames: {
    label: i18n('auditLog.fields.entityNames'),
    render: filterRenders.stringArray(),
  },
  entityId: {
    label: i18n('auditLog.fields.entityId'),
    render: filterRenders.generic(),
  },
  action: {
    label: i18n('auditLog.fields.action'),
    render: filterRenders.generic(),
  },
  createdByEmail: {
    label: i18n('auditLog.fields.createdByEmail'),
    render: filterRenders.generic(),
  },
};

const AuditLogFilter = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    const initialValues = {
      ...emptyValues,
      ...rawFilter,
    };

    const queryFilters = queryString.parse(location.search);

    initialValues.entityNames =
      queryFilters.entityNames || initialValues.entityNames;
    if (
      initialValues.entityNames &&
      !Array.isArray(initialValues.entityNames)
    ) {
      initialValues.entityNames = [
        initialValues.entityNames,
      ];
    }

    initialValues.entityId =
      queryFilters.entityId || initialValues.entityId;

    initialValues.createdByEmail =
      queryFilters.createdByEmail ||
      initialValues.createdByEmail;

    return initialValues;
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        rawFilter,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;
  return (
    <FilterWrapper>
      <Collapse
        activeKey={expanded ? 'filter' : undefined}
        expandIconPosition="right"
        ghost
        onChange={(value) => {
          setExpanded(Boolean(value.length));
        }}
      >
        <Collapse.Panel
          header={
            <FilterPreview
              renders={previewRenders}
              values={rawFilter}
              expanded={expanded}
              onRemove={onRemove}
            />
          }
          key="filter"
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Row gutter={24}>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="timestampRange"
                    label={i18n(
                      'auditLog.fields.timestampRange',
                    )}
                    layout={filterItemLayout}
                    showTime
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="createdByEmail"
                    label={i18n(
                      'auditLog.fields.createdByEmail',
                    )}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <TagsFormItem
                    name="entityNames"
                    label={i18n(
                      'auditLog.fields.entityNames',
                    )}
                    notFoundContent={i18n(
                      'auditLog.entityNamesHint',
                    )}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="entityId"
                    label={i18n('auditLog.fields.entityId')}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="action"
                    label={i18n('auditLog.fields.action')}
                    layout={filterItemLayout}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="filter-buttons" span={24}>
                  <Button
                    loading={loading}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    {i18n('common.search')}
                  </Button>
                  <Button
                    loading={loading}
                    onClick={onReset}
                    icon={<UndoOutlined />}
                  >
                    {i18n('common.reset')}
                  </Button>
                </Col>
              </Row>
            </form>
          </FormProvider>
        </Collapse.Panel>
      </Collapse>
    </FilterWrapper>
  );
};

export default AuditLogFilter;
