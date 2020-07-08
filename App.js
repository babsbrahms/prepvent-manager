/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from "react-redux"
import thunk from "redux-thunk";
import Manager from './src/navigation';
import rootReducer from "./src/rootReducer";
import Message from './src/component/Message';
import MessageWorker from "./src/component/MessageWorker"

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));


const App = () => {
  return (
    <Provider store={store}>
      <View style={{ width: '100%', height: '100%'}}>
        <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
        <StatusBar barStyle="light-content" backgroundColor={"#0E0C20"} />
        <Manager />
        <Message/>
        <MessageWorker />
      </View>
    </Provider>
  );
};

export default App;