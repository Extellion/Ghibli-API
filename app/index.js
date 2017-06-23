import React from 'react';
import {Provider} from 'react-redux';
import {
  AppRegistry
} from 'react-native';

import configureStore from './configureStore';
import App from './containers/app';

const Index = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent('app', () => Index);
