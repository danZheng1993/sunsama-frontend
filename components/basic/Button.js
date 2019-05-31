import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { foregroundColor, buttonTextColor, shadowProps, positiveColor, activeColor } from '../styleConf';

const getBgColor = (type) => {
  switch (type) {
    case 'primary':
      return positiveColor;
    case 'secondary':
      return activeColor;
    default:
      return foregroundColor;
  }
}

const getTxtColor = (type) => {
  switch(type) {
    case 'primary':
      return foregroundColor;
    case 'secondary':
      return foregroundColor;
    default:
      return buttonTextColor;
  }
}

const styles = {
  wrapper: (type) => ({
    backgroundColor: getBgColor(type),
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginBottom: 10,
    ...shadowProps,
  }),
  text: (type) => ({
    fontFamily: 'avenir-medium',
    fontSize: 14,
    lineHeight: 19,
    color: getTxtColor(type),
    textAlign: type === 'default' ? 'left' : 'center',
  })
};

export class Button extends React.Component {
  render() {
    const { title, onPress, type = 'default' } = this.props;
    return (
      <TouchableOpacity style={styles.wrapper(type)} onPress={onPress}>
        <Text style={styles.text(type)}>{title}</Text>
      </TouchableOpacity>
    )
  }
}