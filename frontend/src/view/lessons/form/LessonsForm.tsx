import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import moment from 'moment';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import Storage from 'src/security/storage';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.lessons.fields.name'),
    {},
  ),
  embed: yupFormSchemas.string(
    i18n('entities.lessons.fields.embed'),
    {},
  ),
  chapterId: yupFormSchemas.integer(
    i18n('entities.lessons.fields.chapterId'),
    {},
  ),
  subjectId: yupFormSchemas.integer(
    i18n('entities.lessons.fields.subjectId'),
    {},
  ),
  classId: yupFormSchemas.integer(
    i18n('entities.lessons.fields.classId'),
    {},
  ),
  levelId: yupFormSchemas.integer(
    i18n('entities.lessons.fields.levelId'),
    {},
  ),
  realeaseDate: yupFormSchemas.datetime(
    i18n('entities.lessons.fields.realeaseDate'),
    {},
  ),
  position: yupFormSchemas.boolean(
    i18n('entities.lessons.fields.position'),
    {},
  ),
  visible: yupFormSchemas.boolean(
    i18n('entities.lessons.fields.visible'),
    {},
  ),
  videos: yupFormSchemas.files(
    i18n('entities.lessons.fields.videos'),
    {},
  ),
});

const LessonsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      embed: record.embed,
      chapterId: record.chapterId,
      subjectId: record.subjectId,
      classId: record.classId,
      levelId: record.levelId,
      realeaseDate: record.realeaseDate ? moment(record.realeaseDate) : null,
      position: record.position,
      visible: record.visible,
      videos: record.videos || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  });

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const onSubmit = (values) => {
    props.onSubmit(props?.record?.id, values);
  };

  const { saveLoading } = props;
  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormItem
            name="name"
            label={i18n('entities.lessons.fields.name')}  
            required={false}
            layout={formItemLayout}
            autoFocus
          />
          <InputFormItem
            name="embed"
            label={i18n('entities.lessons.fields.embed')}  
            required={false}
            layout={formItemLayout}
          />
          <InputNumberFormItem
            name="chapterId"
            label={i18n('entities.lessons.fields.chapterId')}  
            required={false}
            layout={formItemLayout}
          />
          <InputNumberFormItem
            name="subjectId"
            label={i18n('entities.lessons.fields.subjectId')}  
            required={false}
            layout={formItemLayout}
          />
          <InputNumberFormItem
            name="classId"
            label={i18n('entities.lessons.fields.classId')}  
            required={false}
            layout={formItemLayout}
          />
          <InputNumberFormItem
            name="levelId"
            label={i18n('entities.lessons.fields.levelId')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="realeaseDate"
            label={i18n('entities.lessons.fields.realeaseDate')}
            required={false}
            showTime
            layout={formItemLayout}
          />
          <SwitchFormItem
            name="position"
            label={i18n('entities.lessons.fields.position')}
            layout={formItemLayout}
          />
          <SwitchFormItem
            name="visible"
            label={i18n('entities.lessons.fields.visible')}
            layout={formItemLayout}
          />
          <FilesFormItem
            name="videos"
            label={i18n('entities.lessons.fields.videos')}
            required={false}
            storage={Storage.values.lessonsVideos}
            max={30}
            formats={undefined}
            layout={formItemLayout}
          />

          <Form.Item
            className="form-buttons"
            {...tailFormItemLayout}
          >
            <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              icon={<SaveOutlined />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined />}
              >
                {i18n('common.cancel')}
              </Button>
            )}
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default LessonsForm;
