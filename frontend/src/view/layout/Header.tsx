import {
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import config from 'src/config';

const { Header: AntHeader } = Layout;

const Header = (props) => {
  const dispatch = useDispatch();

  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const userDropdownText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userDropdownAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const userMenu = (
    <Menu selectedKeys={[]}>
      <Menu.Item
        onClick={doNavigateToProfile}
        key="userCenter"
      >
        <UserOutlined />
        {i18n('auth.profile.title')}
      </Menu.Item>
      <Menu.Item
        onClick={doNavigateToPasswordChange}
        key="passwordChange"
      >
        <LockOutlined />
        {i18n('auth.passwordChange.title')}
      </Menu.Item>
      {['multi', 'multi-with-subdomain'].includes(
        config.tenantMode,
      ) && (
        <Menu.Item
          onClick={doNavigateToTenants}
          key="tenants"
        >
          <AppstoreOutlined />
          {i18n('auth.tenants')}
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item onClick={doSignout} key="logout">
        <LogoutOutlined />
        {i18n('auth.signout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <AntHeader>
        {menuVisible ? (
          <MenuFoldOutlined
            className="trigger"
            onClick={doToggleMenu}
          />
        ) : (
          <MenuUnfoldOutlined
            className="trigger"
            onClick={doToggleMenu}
          />
        )}

        <div className="header-right">
          <span className="i18n-select">
            <I18nSelect />
          </span>

          <Dropdown
            className="user-dropdown"
            overlay={userMenu}
            trigger={['click']}
          >
            <div className="user-dropdown-content">
              <Avatar
                className="user-dropdown-avatar"
                size="small"
                src={userDropdownAvatar || undefined}
                alt="avatar"
                icon={
                  userDropdownAvatar ? undefined : (
                    <UserOutlined />
                  )
                }
              />
              <span className="user-dropdown-text">
                <span>{userDropdownText}</span>{' '}
                {['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                  <span className="user-dropdown-text-tenant">
                    {currentTenant && currentTenant.name}
                  </span>
                )}
              </span>
            </div>
          </Dropdown>
        </div>
      </AntHeader>
    </HeaderWrapper>
  );
};

export default Header;
