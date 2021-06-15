import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import TechNavigator from './navigation/TechNavigator';
import AppLoading from 'expo-app-loading';

import * as Font from 'expo-font';

import { PersistGate } from 'redux-persist/integration/react';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto-bold': require('./fonts/Roboto-Bold.ttf'),
    'roboto-light': require('./fonts/Roboto-Light.ttf'),
    'roboto-regular': require('./fonts/Roboto-Regular.ttf')
  });
};

enableScreens();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TechNavigator />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
