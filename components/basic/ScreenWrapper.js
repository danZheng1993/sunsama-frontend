import React from 'react';
import { View, StatusBar } from 'react-native';

import { backgroundColor } from '../styleConf';

const styles = {
  flex: 1,
  paddingHorizontal: 28,
  paddingTop: 44,
  backgroundColor,
};

export const ScreenWrapper = ({ children, style }) => (
  <View style={[styles, style]}>
    <StatusBar />
    {children}
  </View>
);
