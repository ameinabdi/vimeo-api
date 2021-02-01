import { Layout as AntLayout } from 'antd';
import React from 'react';
import Header from 'src/view/layout/Header';
import Menu from 'src/view/layout/Menu';
import LayoutWrapper from 'src/view/layout/styles/LayoutWrapper';
import { useRouteMatch } from 'react-router-dom';
const { Content } = AntLayout;

const Layout = (props) => {
  const match = useRouteMatch();

  return (
    <LayoutWrapper>
      <Menu url={match.url} />

      <AntLayout>
        <Header />

        <Content>{props.children}</Content>
      </AntLayout>
    </LayoutWrapper>
  );
};

export default Layout;
