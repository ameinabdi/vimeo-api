import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/lessons/importer/lessonsImporterSelectors';
import LessonsService from 'src/modules/lessons/lessonsService';
import fields from 'src/modules/lessons/importer/lessonsImporterFields';
import { i18n } from 'src/i18n';

const lessonsImporterActions = importerActions(
  'LESSONS_IMPORTER',
  selectors,
  LessonsService.import,
  fields,
  i18n('entities.lessons.importer.fileName'),
);

export default lessonsImporterActions;