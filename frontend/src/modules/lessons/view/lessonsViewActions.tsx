import LessonsService from 'src/modules/lessons/lessonsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'LESSONS_VIEW';

const lessonsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: lessonsViewActions.FIND_STARTED,
      });

      const record = await LessonsService.find(id);

      dispatch({
        type: lessonsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: lessonsViewActions.FIND_ERROR,
      });

      getHistory().push('/lessons');
    }
  },
};

export default lessonsViewActions;
