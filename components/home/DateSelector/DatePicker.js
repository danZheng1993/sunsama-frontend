import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

import LogoutButton from './LogoutButton';
import { primaryTextColor, secondaryTextColor } from '../../styleConf';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 18,
  },
  weekday: {
    fontSize: 24,
    fontFamily: 'avenir-heavy',
    lineHeight: 33,
    color: primaryTextColor
  },
  date: {
    fontSize: 14,
    fontFamily: 'avenir-medium',
    lineHeight: 17,
    color: secondaryTextColor
  },
  indicator: {
    marginTop: 10,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default class DatePicker extends React.Component {
  state = { opened: false };

  aniVal = new Animated.Value(0);

  onPress = () => {
    const { onClose, onOpen } = this.props;
    if (this.state.opened) {
      onClose();
      this.closePicker();
    } else {
      onOpen();
      this.openPicker();
    }
  }

  getDateString = () => {
    const { curDate } = this.props;
    const weekday = moment(curDate).format('dddd');
    const date = moment(curDate).format('MMMM D');
    return { weekday, date };
  }

  openPicker() {
    Animated.timing(this.aniVal, {
      toValue: 1,
      duration: 500,
    }).start(() => { this.setState({ opened: true }) });
  }

  closePicker()  {
    Animated.timing(this.aniVal, {
      toValue: 0,
      duration: 500,
    }).start(() => { this.setState({ opened: false }) });
  }

  render() {
    const { weekday, date } = this.getDateString();
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapper} onPress={this.onPress}>
          <View style={styles.dateContent}>
            <Text style={styles.weekday}>{weekday}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{
                  rotate: this.aniVal.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-90deg', '0deg']
                  })
                }]
              }
            ]}
          >
            <Entypo name="triangle-right" color="black" size={15} />
          </Animated.View>
        </TouchableOpacity>
        <LogoutButton />
      </View>
    )
  }
}