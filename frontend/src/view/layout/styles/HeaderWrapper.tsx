import styled from 'styled-components';

const HeaderWrapper = styled.div`
  .ant-layout-header {
    background: #fff;
    padding: 0;
    border-bottom: 1px solid #e9e9e9;

    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 640px) {
    .i18n-select {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .tenant-select {
      display: none;
    }
  }

  .user-dropdown {
    padding: 0 24px;
    cursor: pointer;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    > i {
      vertical-align: middle;
      color: @text-color;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    :global(&.ant-popover-open) {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .user-dropdown-content {
    display: flex;
    line-height: 18px;
    align-items: center;
  }

  .user-dropdown-avatar {
    margin: 20px 8px 20px 0;
    vertical-align: top;
  }

  .user-dropdown-text {
    display: flex;
    flex-direction: column;
  }

  .user-dropdown-text-tenant {
    font-weight: 500;
    font-size: 12px;
  }

  .header-right {
    display: flex;
  }

  @media (max-width: 576px) {
    .user-dropdown-text {
      display: none;
    }
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: var(--primary-color);
    }
  }
`;

export default HeaderWrapper;
