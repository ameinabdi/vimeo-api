import styled from 'styled-components';

const FilterWrapper = styled.div`
  margin-bottom: 16px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;

  .filter-preview {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .filter-preview-values {
    margin-left: 8px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .ant-form-item-label {
    white-space: normal;
  }

  .filter-buttons {
    text-align: right;

    .ant-btn {
      margin-left: 8px;
      margin-bottom: 8px;
    }
  }
`;

export const filterItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 18 },
  },
};

export default FilterWrapper;
