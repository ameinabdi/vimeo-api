import { Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ImporterRowStatus from 'src/view/shared/importer/ImporterRowStatus';

export default (selectors, actions, fields) => {
  const ImporterList = (props) => {
    const rows: Array<any> = useSelector(
      selectors.selectRows,
    );
    const pendingRowsCount = useSelector(
      selectors.selectPendingRowsCount,
    );
    const errorRowsCount = useSelector(
      selectors.selectErrorRowsCount,
    );
    const importedRowsCount = useSelector(
      selectors.selectImportedRowsCount,
    );

    const showTotal = () => {
      return i18n(
        'importer.total',
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      );
    };

    const columns = [
      {
        title: i18n('importer.line'),
        dataIndex: '_line',
        key: '_line',
        width: 100,
        sorter: (a, b) => a._line - b._line,
      },
      ...fields.map((schemaItem) => {
        return {
          title: schemaItem.label,
          dataIndex: schemaItem.name,
          key: schemaItem.name,
          sorter: (a, b) =>
            (
              String(a[schemaItem.name]) || ''
            ).localeCompare(
              String(b[schemaItem.name]) || '',
            ),
          render: (value) => String(value || ''),
        };
      }),
      {
        title: i18n('importer.status'),
        dataIndex: '_status',
        key: '_status',
        width: '200px',
        sorter: (a, b) =>
          (a._status || '').localeCompare(b._status || ''),
        render: (value, record) => (
          <ImporterRowStatus
            value={value}
            errorMessage={record._errorMessage}
          />
        ),
      },
    ];
    return (
      <TableWrapper>
        <Table
          rowKey="_line"
          columns={columns}
          dataSource={rows}
          scroll={{
            x: true,
          }}
          pagination={{
            showTotal: showTotal,
          }}
        />
      </TableWrapper>
    );
  };

  return ImporterList;
};
