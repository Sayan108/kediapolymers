/**
 * @format
 */
import {store, persistor} from './src/redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native-paper';

import {startNetworkLogging} from 'react-native-network-logger';
const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

startNetworkLogging();

AppRegistry.registerComponent(appName, () => RNRedux);
