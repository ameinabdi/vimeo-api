import { FileSearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import Toolbar from 'src/view/shared/styles/Toolbar';

const SettingsFormToolbar = (props) => {
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );

  return (
    <Toolbar>
      {hasPermissionToAuditLogs && (
        <Link to={`/audit-logs?entityNames=settings`}>
          <Button icon={<FileSearchOutlined />}>
            {i18n('auditLog.menu')}
          </Button>
        </Link>
      )}
    </Toolbar>
  );
};

export default SettingsFormToolbar;
