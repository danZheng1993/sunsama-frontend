import React from 'react';
import { TextInput } from 'react-native';
import { foregroundColor, activeColor } from '../styleConf';

const style = {
  padding: 12,
  backgroundColor: foregroundColor,
  borderBottomWidth: 1,
  borderBottomColor: activeColor,
  marginBottom: 10,
};

export const Input = (props) => (
  <TextInput style={style} {...props} />
);
