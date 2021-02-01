import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import moment from 'moment';
import FilesViewer from 'src/view/shared/FilesViewer';

const LessonsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.name) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.lessons.fields.name')}
        >
          {record.name}
        </Form.Item>
      )}

      {Boolean(record.embed) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.lessons.fields.embed')}
        >
          {record.embed}
        </Form.Item>
      )}

      {Boolean(record.chapterId) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.lessons.fields.chapterId')}
        >
          {record.chapterId}
        </Form.Item>
      )}

      {Boolean(record.subjectId) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.lessons.fields.subjectId')}
        >
          {record.subjectId}
        </Form.Item>
      )}

      {Boolean(record.classId) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.lessons.fields.classId')}
        >
          {record.classId}
        </Form.Item>
      )}

      {Boolean(record.levelId) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.lessons.fields.levelId')}
        >
          {record.levelId}
        </Form.Item>
      )}

      {Boolean(record.realeaseDate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.lessons.fields.realeaseDate',
          )}
        >
          <>
            {moment(record.realeaseDate).format(
              'YYYY-MM-DD HH:mm',
            )}
          </>
        </Form.Item>
      )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.lessons.fields.position')}
      >
        {record.position
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.lessons.fields.visible')}
      >
        {record.visible
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>

      {Boolean(record.videos) &&
        Boolean(record.videos.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n(
              'entities.lessons.fields.videos',
            )}
          >
            <FilesViewer value={record.videos} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default LessonsView;
