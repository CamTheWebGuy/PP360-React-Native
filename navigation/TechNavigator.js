import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';

const TechNav = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: `PoolPro360 Tech App`,
      headerLeft: () => null,
      headerShown: false
    }
  }
});

export default createAppContainer(TechNav);
