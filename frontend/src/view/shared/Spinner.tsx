import { Spin } from 'antd';
import React from 'react';

const Spinner = (props) => {
  return (
    <div
      style={{
        width: '100%',
        marginTop: '24px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin />
    </div>
  );
};

export default Spinner;
