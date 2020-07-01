/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Manager from './src/navigation';


const App = () => {
  return (
    <View style={{ width: '100%', height: '100%'}}>
      {/* <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight()}} /> */}
      <StatusBar barStyle="light-content" backgroundColor={"#0E0C20"} />
        <Manager />
    </View>
  );
};
export default App;