import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LogInScreen';
import SignupScreen from '../screens/SignupScreen';

export const AuthStack = createAppContainer(createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
}, {
  navigationOptions: { header: null }
}));
