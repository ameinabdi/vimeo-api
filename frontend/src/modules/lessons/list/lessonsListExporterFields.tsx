import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.lessons.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.lessons.fields.name'),
  },
  {
    name: 'embed',
    label: i18n('entities.lessons.fields.embed'),
  },
  {
    name: 'chapterId',
    label: i18n('entities.lessons.fields.chapterId'),
  },
  {
    name: 'subjectId',
    label: i18n('entities.lessons.fields.subjectId'),
  },
  {
    name: 'classId',
    label: i18n('entities.lessons.fields.classId'),
  },
  {
    name: 'levelId',
    label: i18n('entities.lessons.fields.levelId'),
  },
  {
    name: 'realeaseDate',
    label: i18n('entities.lessons.fields.realeaseDate'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'position',
    label: i18n('entities.lessons.fields.position'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'visible',
    label: i18n('entities.lessons.fields.visible'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'videos',
    label: i18n('entities.lessons.fields.videos'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.lessons.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.lessons.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
