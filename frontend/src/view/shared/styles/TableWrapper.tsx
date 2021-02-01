import styled from 'styled-components';

const TableWrapper = styled.div`
  .ant-table th {
    white-space: nowrap;
  }

  .ant-table td {
    white-space: nowrap;
  }

  .ant-table .table-actions {
    text-align: right;
  }

  .ant-table .table-actions a,
  .ant-table .table-actions button {
    margin-left: 8px;
  }
`;

export default TableWrapper;
