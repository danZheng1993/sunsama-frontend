import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';

export const HomeStack = createAppContainer(createStackNavigator({
  Home: HomeScreen,
}, {
  navigationOptions: { header: 'none' }
}));
