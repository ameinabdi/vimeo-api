import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/lessons/list/lessonsListActions';
import selectors from 'src/modules/lessons/list/lessonsListSelectors';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('entities.lessons.fields.name'),
  ),
  embed: yupFilterSchemas.string(
    i18n('entities.lessons.fields.embed'),
  ),
  chapterIdRange: yupFilterSchemas.integerRange(
    i18n('entities.lessons.fields.chapterIdRange'),
  ),
  subjectIdRange: yupFilterSchemas.integerRange(
    i18n('entities.lessons.fields.subjectIdRange'),
  ),
  classIdRange: yupFilterSchemas.integerRange(
    i18n('entities.lessons.fields.classIdRange'),
  ),
  levelIdRange: yupFilterSchemas.integerRange(
    i18n('entities.lessons.fields.levelIdRange'),
  ),
  realeaseDateRange: yupFilterSchemas.datetimeRange(
    i18n('entities.lessons.fields.realeaseDateRange'),
  ),
  position: yupFilterSchemas.boolean(
    i18n('entities.lessons.fields.position'),
  ),
  visible: yupFilterSchemas.boolean(
    i18n('entities.lessons.fields.visible'),
  ),
});

const emptyValues = {
  name: null,
  embed: null,
  chapterIdRange: [],
  subjectIdRange: [],
  classIdRange: [],
  levelIdRange: [],
  realeaseDateRange: [],
  position: null,
  visible: null,
}

const previewRenders = {
  name: {
    label: i18n('entities.lessons.fields.name'),
    render: filterRenders.generic(),
  },
  embed: {
    label: i18n('entities.lessons.fields.embed'),
    render: filterRenders.generic(),
  },
  chapterIdRange: {
    label: i18n('entities.lessons.fields.chapterIdRange'),
    render: filterRenders.range(),
  },
  subjectIdRange: {
    label: i18n('entities.lessons.fields.subjectIdRange'),
    render: filterRenders.range(),
  },
  classIdRange: {
    label: i18n('entities.lessons.fields.classIdRange'),
    render: filterRenders.range(),
  },
  levelIdRange: {
    label: i18n('entities.lessons.fields.levelIdRange'),
    render: filterRenders.range(),
  },
  realeaseDateRange: {
    label: i18n('entities.lessons.fields.realeaseDateRange'),
    render: filterRenders.datetimeRange(),
  },
  position: {
    label: i18n('entities.lessons.fields.position'),
    render: filterRenders.boolean(),
  },
  visible: {
    label: i18n('entities.lessons.fields.visible'),
    render: filterRenders.boolean(),
  },
}

const LessonsListFilter = (props) => {
  const dispatch = useDispatch();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
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
                  <InputFormItem
                    name="name"
                    label={i18n('entities.lessons.fields.name')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="embed"
                    label={i18n('entities.lessons.fields.embed')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputNumberRangeFormItem
                    name="chapterIdRange"
                    label={i18n('entities.lessons.fields.chapterIdRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputNumberRangeFormItem
                    name="subjectIdRange"
                    label={i18n('entities.lessons.fields.subjectIdRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputNumberRangeFormItem
                    name="classIdRange"
                    label={i18n('entities.lessons.fields.classIdRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputNumberRangeFormItem
                    name="levelIdRange"
                    label={i18n('entities.lessons.fields.levelIdRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="realeaseDateRange"
                    label={i18n('entities.lessons.fields.realeaseDateRange')}    
                    showTime
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="position"
                    label={i18n('entities.lessons.fields.position')}
                    options={[
                      {
                        value: true,
                        label: i18n('common.yes'),
                      },
                      {
                        value: false,
                        label: i18n('common.no'),
                      },
                    ]}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="visible"
                    label={i18n('entities.lessons.fields.visible')}
                    options={[
                      {
                        value: true,
                        label: i18n('common.yes'),
                      },
                      {
                        value: false,
                        label: i18n('common.no'),
                      },
                    ]}
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

export default LessonsListFilter;