import UserService from 'src/modules/user/userService';
import selectors from 'src/modules/user/list/userListSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/user/list/userListExporterFields';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'USER_LIST';

const userListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  SELECTEDS_CHANGED: `${prefix}_SELECTEDS_CHANGED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  DESTROY_ALL_SELECTED_STARTED: `${prefix}_DESTROY_ALL_SELECTED_STARTED`,
  DESTROY_ALL_SELECTED_SUCCESS: `${prefix}_DESTROY_ALL_SELECTED_SUCCESS`,
  DESTROY_ALL_SELECTED_ERROR: `${prefix}_DESTROY_ALL_SELECTED_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doChangeSelected(payload) {
    return {
      type: userListActions.SELECTEDS_CHANGED,
      payload,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: userListActions.RESETED,
    });

    dispatch(userListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: userListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await UserService.fetchUsers(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('user.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: userListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePaginationAndSort: (pagination, sorter) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: userListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch({
      type: userListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(userListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(userListActions.doFetch(filter, rawFilter, true));
  },

  doFetch: (filter?, rawFilter?, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: userListActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });

      const response = await UserService.fetchUsers(
        filter,
        selectors.selectOrderBy(getState()),
        selectors.selectLimit(getState()),
        selectors.selectOffset(getState()),
      );

      dispatch({
        type: userListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.FETCH_ERROR,
      });
    }
  },

  doDestroy: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userListActions.DESTROY_STARTED,
      });

      await UserService.destroy([id]);

      dispatch({
        type: userListActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('user.doDestroySuccess'));

      dispatch(userListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.DESTROY_ERROR,
      });

      dispatch(userListActions.doFetchCurrentFilter());
    }
  },

  doDestroyAllSelected: () => async (
    dispatch,
    getState,
  ) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: userListActions.DESTROY_ALL_SELECTED_STARTED,
      });

      await UserService.destroy(
        selectedRows.map((row) => row.id),
      );

      dispatch({
        type: userListActions.DESTROY_ALL_SELECTED_SUCCESS,
      });

      Message.success(
        i18n('user.doDestroyAllSelectedSuccess'),
      );

      dispatch(userListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.DESTROY_ALL_SELECTED_ERROR,
      });

      dispatch(userListActions.doFetchCurrentFilter());
    }
  },
};

export default userListActions;
