import { Breadcrumb as AntBreadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
  const isLink = (item) => {
    return item.length > 1;
  };

  return (
    <AntBreadcrumb>
      {props.items.map((item) => (
        <AntBreadcrumb.Item key={item[0]}>
          {isLink(item) ? (
            <Link to={item[1]}>{item[0]}</Link>
          ) : (
            item[0]
          )}
        </AntBreadcrumb.Item>
      ))}
    </AntBreadcrumb>
  );
};

export default Breadcrumb;
