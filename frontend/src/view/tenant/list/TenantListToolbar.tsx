import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import Toolbar from 'src/view/shared/styles/Toolbar';

const TenantToolbar = (props) => {
  return (
    <Toolbar>
      <Link to="/tenant/new">
        <Button type="primary" icon={<PlusOutlined />}>
          {i18n('common.new')}
        </Button>
      </Link>
    </Toolbar>
  );
};

export default TenantToolbar;
