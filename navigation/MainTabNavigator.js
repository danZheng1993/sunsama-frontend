import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LogInScreen';
import SignupScreen from '../screens/SignupScreen';

const HomeStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  Home: HomeScreen,
});

export default HomeStack;