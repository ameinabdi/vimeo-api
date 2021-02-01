import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/lessons/list/lessonsListActions';
import destroyActions from 'src/modules/lessons/destroy/lessonsDestroyActions';
import selectors from 'src/modules/lessons/list/lessonsListSelectors';
import destroySelectors from 'src/modules/lessons/destroy/lessonsDestroySelectors';
import lessonsSelectors from 'src/modules/lessons/lessonsSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import moment from 'moment';
import FilesListView from 'src/view/shared/list/FileListView';

const LessonsListTable = (props) => {
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasPermissionToEdit = useSelector(
    lessonsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    lessonsSelectors.selectPermissionToDestroy,
  );

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  const doDestroy = (id) => {
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
      {
        title: i18n('entities.lessons.fields.name'),
        sorter: true,
        dataIndex: 'name',
      },
      {
        title: i18n('entities.lessons.fields.embed'),
        sorter: true,
        dataIndex: 'embed',
      },
      {
        title: i18n('entities.lessons.fields.chapterId'),
        sorter: true,  
        dataIndex: 'chapterId',
        align: 'right',
      },
      {
        title: i18n('entities.lessons.fields.subjectId'),
        sorter: true,  
        dataIndex: 'subjectId',
        align: 'right',
      },
      {
        title: i18n('entities.lessons.fields.classId'),
        sorter: true,  
        dataIndex: 'classId',
        align: 'right',
      },
      {
        title: i18n('entities.lessons.fields.levelId'),
        sorter: true,  
        dataIndex: 'levelId',
        align: 'right',
      },
      {
        title: i18n('entities.lessons.fields.realeaseDate'),
        sorter: true,
        dataIndex: 'realeaseDate',
        render: (value) =>
          value
            ? moment(value).format('YYYY-MM-DD HH:mm')
            : null,
      },
      {
        title: i18n('entities.lessons.fields.position'),
        sorter: true,
        dataIndex: 'position',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
      {
        title: i18n('entities.lessons.fields.visible'),
        sorter: true,
        dataIndex: 'visible',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
      {
        title: i18n('entities.lessons.fields.videos'),
        sorter: false,
        dataIndex: 'videos',
        render: (value) => <FilesListView value={value} />,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/lessons/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/lessons/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const rowSelection = () => {
    return {
      selectedRowKeys: selectedKeys,
      onChange: (selectedRowKeys) => {
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  return (
    <TableWrapper>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns as any}
        dataSource={rows}
        pagination={pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection()}
        scroll={{
          x: true,
        }}
      />
    </TableWrapper>
  );
};

export default LessonsListTable;
