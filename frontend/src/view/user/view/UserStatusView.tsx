import { i18n } from 'src/i18n';
import React from 'react';
import { Tag } from 'antd';

function UserStatusView(props) {
  const { value } = props;

  if (!value) {
    return null;
  }

  if (value === 'active') {
    return (
      <Tag color="green">{i18n('user.status.active')}</Tag>
    );
  }

  if (value === 'empty-permissions') {
    return (
      <Tag color="red">
        {i18n('user.status.empty-permissions')}
      </Tag>
    );
  }

  return (
    <Tag color="gold">{i18n('user.status.invited')}</Tag>
  );
}

export default UserStatusView;
