import React, { useState } from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Provider as AntdProvider } from '@ant-design/react-native';
import { store } from './store';
import Navigation from './navigation';
import { Locales, SetAppLocaleContext } from './locales';

const App = () => {

  const [appLocale, setAppLocale] = useState('en-US');

  return (
    <SetAppLocaleContext.Provider value={setAppLocale}>
      <ReduxProvider store={store}>
        <IntlProvider messages={Locales[appLocale]} locale={appLocale} defaultLocale={appLocale}>
          <AntdProvider>
            <Navigation />
          </AntdProvider>
        </IntlProvider>
      </ReduxProvider>
    </SetAppLocaleContext.Provider>
  );
};


export default App;
