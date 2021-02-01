import LessonsService from 'src/modules/lessons/lessonsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'LESSONS_FORM';

const lessonsFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: lessonsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await LessonsService.find(id);
      }

      dispatch({
        type: lessonsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: lessonsFormActions.INIT_ERROR,
      });

      getHistory().push('/lessons');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: lessonsFormActions.CREATE_STARTED,
      });

      await LessonsService.create(values);

      dispatch({
        type: lessonsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.lessons.create.success'),
      );

      getHistory().push('/lessons');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: lessonsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: lessonsFormActions.UPDATE_STARTED,
      });

      await LessonsService.update(id, values);

      dispatch({
        type: lessonsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.lessons.update.success'),
      );

      getHistory().push('/lessons');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: lessonsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default lessonsFormActions;
