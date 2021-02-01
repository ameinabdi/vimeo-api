import { InboxOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import {
  EXCEL_EXTENSION,
  EXCEL_TYPE,
} from 'src/modules/shared/excel/excel';
import FormWrapper, {
  formItemLayout,
} from 'src/view/shared/styles/FormWrapper';

export default (selectors, actions) => {
  const ImporterForm = (props) => {
    const dispatch = useDispatch();
    const errorMessage: string = useSelector(
      selectors.selectErrorMessage,
    );

    const handleRequest = (request) => {
      const file = request.file;
      dispatch(actions.doReadFile(file));
    };

    return (
      <FormWrapper
        style={{
          paddingLeft: 0,
        }}
      >
        <Form.Item
          help={errorMessage}
          validateStatus={
            errorMessage ? 'error' : 'success'
          }
          {...formItemLayout}
        >
          <Dragger
            showUploadList={false}
            accept={`${EXCEL_TYPE}, ${EXCEL_EXTENSION}`}
            customRequest={handleRequest}
            name="file"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {i18n('importer.form.hint')}
            </p>
          </Dragger>
        </Form.Item>
      </FormWrapper>
    );
  };
  return ImporterForm;
};
