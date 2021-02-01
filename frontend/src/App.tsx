import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import React from 'react';
import { Provider } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import { ConfigProvider } from 'antd';
import { getAntdLanguage } from 'src/i18n';

const store = configureStore();

const App = (props) => {
  return (
    <ConfigProvider locale={getAntdLanguage()}>
      <Provider store={store}>
        <ConnectedRouter history={getHistory()}>
          <RoutesComponent />
        </ConnectedRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
