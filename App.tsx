/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import AppNavContainer from './src/navigation/AppNavContainer';
import {store} from './src/redux/store';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from 'react-query';
import {LogBox} from 'react-native';
import _ from 'lodash';
import FlashMessage from 'react-native-flash-message';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message: any) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const queryClient = new QueryClient();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <MenuProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavContainer />
        </QueryClientProvider>
      </MenuProvider>
      <FlashMessage position="bottom" />
    </Provider>
  );
};

export default App;
