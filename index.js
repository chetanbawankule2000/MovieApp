/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import RootComponent from './App';
import {name as appName} from './app.json';

// ---- PACKAGES ----
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
