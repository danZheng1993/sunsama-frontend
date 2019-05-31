import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { foregroundColor, buttonTextColor, shadowProps } from '../styleConf';

const styles = {
  wrapper: {
    backgroundColor: foregroundColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginBottom: 10,
    ...shadowProps,
  },
  text: {
    fontFamily: 'avenir-medium',
    fontSize: 14,
    lineHeight: 19,
    color: buttonTextColor,
  }
};

export default class Button extends React.Component {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
  }
}