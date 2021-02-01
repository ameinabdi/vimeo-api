import { Layout, Menu } from 'antd';
import React, { useEffect } from 'react';
import SiderWrapper from 'src/view/layout/styles/SiderWrapper';
import { Link } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import { useSelector, useDispatch } from 'react-redux';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import menus from 'src/view/menus';
import { i18n } from 'src/i18n';

const { Sider } = Layout;

const AppMenu = (props) => {
  const dispatch = useDispatch();
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );
  const logoUrl = useSelector(authSelectors.selectLogoUrl);

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  const toggleMenuOnResize = () => {
    window.innerWidth < 576 ? hideMenu() : showMenu();
  };

  useEffect(() => {
    toggleMenuOnResize();
    window.addEventListener('resize', toggleMenuOnResize);

    return () => {
      window.removeEventListener(
        'resize',
        toggleMenuOnResize,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedKeys = () => {
    const url = props.url;
    const match = menus.find((option) => {
      if (option.exact) {
        return url === option.path;
      }

      return (
        url === option.path ||
        url.startsWith(option.path + '/')
      );
    });

    if (match) {
      return [match.path];
    }
  };

  const hideMenu = () => {
    dispatch(actions.doHideMenu());
  };

  const showMenu = () => {
    dispatch(actions.doShowMenu());
  };

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const lockedForCurrentPlan = (permission) => {
    return permissionChecker.lockedForCurrentPlan(
      permission,
    );
  };

  return (
    <SiderWrapper
      style={{
        display: menuVisible ? 'block' : 'none',
      }}
    >
      <Sider theme="dark" trigger={null}>
        <div className="logo">
          {logoUrl ? (
            <Link to="/">
              <img
                src={logoUrl}
                width="164px"
                alt={i18n('app.title')}
              />
            </Link>
          ) : (
            <h2>
              <Link to="/">{i18n('app.title')}</Link>
            </h2>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys()}
        >
          {menus
            .filter((menu) =>
              match(menu.permissionRequired),
            )
            .map((menu) => (
              <Menu.Item key={menu.path}>
                <Link to={menu.path}>
                  {menu.icon}
                  <span>{menu.label}</span>
                </Link>
              </Menu.Item>
            ))}

          {menus
            .filter((menu) =>
              lockedForCurrentPlan(menu.permissionRequired),
            )
            .map((menu) => (
              <Menu.Item
                style={{
                  cursor: 'auto',
                  opacity: 0.3,
                }}
                key={menu.path}
              >
                {menu.icon}
                <span>{menu.label}</span>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
    </SiderWrapper>
  );
};

export default AppMenu;
