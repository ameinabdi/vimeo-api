import { Tooltip, Form } from 'antd';
import React from 'react';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import UserStatusView from 'src/view/user/view/UserStatusView';
import { i18n } from 'src/i18n';
import ImagesViewer from 'src/view/shared/ImagesViewer';

const UserView = (props) => {
  const { user, loading } = props;

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {user.email && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('user.fields.email')}
        >
          {user.email}
        </Form.Item>
      )}

      {user.firstName && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('user.fields.firstName')}
        >
          {user.firstName}
        </Form.Item>
      )}

      {user.lastName && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('user.fields.lastName')}
        >
          {user.lastName}
        </Form.Item>
      )}

      {user.phoneNumber && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('user.fields.phoneNumber')}
        >
          +{user.phoneNumber}
        </Form.Item>
      )}

      {user.avatars && Boolean(user.avatars.length) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('user.fields.avatars')}
        >
          <ImagesViewer value={user.avatars} />
        </Form.Item>
      )}

      {user.status && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('user.fields.status')}
        >
          <UserStatusView value={user.status} />
        </Form.Item>
      )}

      {user.roles && Boolean(user.roles.length) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('user.fields.roles')}
        >
          {user.roles.map((roleId) => (
            <div key={roleId}>
              <Tooltip title={Roles.descriptionOf(roleId)}>
                <span>{Roles.labelOf(roleId)}</span>
              </Tooltip>
            </div>
          ))}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default UserView;
