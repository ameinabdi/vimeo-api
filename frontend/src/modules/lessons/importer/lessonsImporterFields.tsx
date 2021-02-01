import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.lessons.fields.name'),
    schema: schemas.string(
      i18n('entities.lessons.fields.name'),
      {},
    ),
  },
  {
    name: 'embed',
    label: i18n('entities.lessons.fields.embed'),
    schema: schemas.string(
      i18n('entities.lessons.fields.embed'),
      {},
    ),
  },
  {
    name: 'chapterId',
    label: i18n('entities.lessons.fields.chapterId'),
    schema: schemas.integer(
      i18n('entities.lessons.fields.chapterId'),
      {},
    ),
  },
  {
    name: 'subjectId',
    label: i18n('entities.lessons.fields.subjectId'),
    schema: schemas.integer(
      i18n('entities.lessons.fields.subjectId'),
      {},
    ),
  },
  {
    name: 'classId',
    label: i18n('entities.lessons.fields.classId'),
    schema: schemas.integer(
      i18n('entities.lessons.fields.classId'),
      {},
    ),
  },
  {
    name: 'levelId',
    label: i18n('entities.lessons.fields.levelId'),
    schema: schemas.integer(
      i18n('entities.lessons.fields.levelId'),
      {},
    ),
  },
  {
    name: 'realeaseDate',
    label: i18n('entities.lessons.fields.realeaseDate'),
    schema: schemas.datetime(
      i18n('entities.lessons.fields.realeaseDate'),
      {},
    ),
  },
  {
    name: 'position',
    label: i18n('entities.lessons.fields.position'),
    schema: schemas.boolean(
      i18n('entities.lessons.fields.position'),
      {},
    ),
  },
  {
    name: 'visible',
    label: i18n('entities.lessons.fields.visible'),
    schema: schemas.boolean(
      i18n('entities.lessons.fields.visible'),
      {},
    ),
  },
  {
    name: 'videos',
    label: i18n('entities.lessons.fields.videos'),
    schema: schemas.files(
      i18n('entities.lessons.fields.videos'),
      {},
    ),
  },
];