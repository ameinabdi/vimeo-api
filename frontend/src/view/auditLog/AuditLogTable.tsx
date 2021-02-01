import { Table } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auditLog/auditLogActions';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import AuditLogViewModal from 'src/view/auditLog/AuditLogViewModal';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import moment from 'moment';

const AuditLogTable = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );

  const [selectedValues, setSelectedValues] = useState<
    string | null
  >(null);

  const onAuditLogViewModalClose = () => {
    setSelectedValues(null);
  };

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  const columns = [
    {
      title: i18n('auditLog.fields.timestamp'),
      sorter: true,
      dataIndex: 'timestamp',
      render: (value) =>
        value
          ? moment(value).format('YYYY-MM-DD HH:mm')
          : null,
    },
    {
      title: i18n('auditLog.fields.createdByEmail'),
      sorter: true,
      dataIndex: 'createdByEmail',
    },
    {
      title: i18n('auditLog.fields.entityName'),
      sorter: true,
      dataIndex: 'entityName',
    },
    {
      title: i18n('auditLog.fields.action'),
      sorter: true,
      dataIndex: 'action',
    },
    {
      title: i18n('auditLog.fields.entityId'),
      sorter: true,
      dataIndex: 'entityId',
    },
    {
      title: null,
      dataIndex: 'values',
      render: (values) => {
        return (
          <ButtonLink
            onClick={() =>
              setSelectedValues(
                JSON.stringify(values, null, 2),
              )
            }
          >
            {i18n('common.view')}
          </ButtonLink>
        );
      },
    },
  ];

  return (
    <>
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={rows}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{
            x: true,
          }}
        />
      </TableWrapper>

      <AuditLogViewModal
        visible={Boolean(selectedValues)}
        code={selectedValues}
        onCancel={() => onAuditLogViewModalClose()}
      />
    </>
  );
};

export default AuditLogTable;
