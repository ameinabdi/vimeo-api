import list from 'src/modules/lessons/list/lessonsListReducers';
import form from 'src/modules/lessons/form/lessonsFormReducers';
import view from 'src/modules/lessons/view/lessonsViewReducers';
import destroy from 'src/modules/lessons/destroy/lessonsDestroyReducers';
import importerReducer from 'src/modules/lessons/importer/lessonsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
