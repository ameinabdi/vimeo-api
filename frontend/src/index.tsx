import React from 'react';
import ReactDOM from 'react-dom';
import { i18n, init as i18nInit } from 'src/i18n';
import { AuthToken } from './modules/auth/authToken';
import TenantService from './modules/tenant/tenantService';
import SettingsService from './modules/settings/settingsService';

(async function () {
  AuthToken.applyFromLocationUrlIfExists();
  await TenantService.fetchAndApply();
  SettingsService.applyThemeFromTenant();
  await i18nInit();

  document.title = i18n('app.title');
  const App = require('./App').default;
  ReactDOM.render(<App />, document.getElementById('root'));
})();
