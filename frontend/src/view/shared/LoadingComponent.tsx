import React, { useEffect } from 'react';
import ProgressBar from 'src/view/shared/ProgressBar';

const LoadingComponent = (props) => {
  useEffect(() => {
    ProgressBar.start();
    return () => {
      ProgressBar.done();
    };
  }, []);

  return <div />;
};

export default LoadingComponent;
