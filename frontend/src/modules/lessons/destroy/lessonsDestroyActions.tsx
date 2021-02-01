import listActions from 'src/modules/lessons/list/lessonsListActions';
import LessonsService from 'src/modules/lessons/lessonsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'LESSONS_DESTROY';

const lessonsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: lessonsDestroyActions.DESTROY_STARTED,
      });

      await LessonsService.destroyAll([id]);

      dispatch({
        type: lessonsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.lessons.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/lessons');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: lessonsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: lessonsDestroyActions.DESTROY_ALL_STARTED,
      });

      await LessonsService.destroyAll(ids);

      dispatch({
        type: lessonsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.lessons.destroyAll.success'),
      );

      getHistory().push('/lessons');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: lessonsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default lessonsDestroyActions;
