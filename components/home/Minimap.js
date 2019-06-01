import React from 'react';
import { Animated, TouchableWithoutFeedback, View, Dimensions, Text } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import set from 'lodash.set';

import { foregroundColor } from '../styleConf';

const { width, height } = Dimensions.get('screen');

const CALENDAR_WIDTH = width - 56;

const styles = {
  wrapper: {
    position: 'absolute',
    width,
    height: 0,
    bottom: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingHorizontal: 28,
    paddingTop: 18,
    backgroundColor: foregroundColor,
    pointerEvents: "box-none",
  },
  startText: {
    color: '#000',
    fontSize: 10,
    marginBottom: 10,
    fontFamily: 'avenir-light',
  },
  absoluteFill: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
  },
}

export class Minimap extends React.Component {
  state = { show: false };

  aniVal = new Animated.Value(0);

  onHide = () => {
    this.hide();
    this.props.onCancelMove();
  }

  show() {
    this.setState({ show: true });
    Animated.timing(this.aniVal, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  hide() {
    Animated.timing(this.aniVal, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      this.setState({ show: false });
    })
  }

  render () {
    const { curDate, onConfirmMove } = this.props;
    const { show } = this.state;
    const markedDates = {};
    set(markedDates, moment(curDate).format('YYYY-MM-DD'), { selected: true });
    return show && (
      <TouchableWithoutFeedback onPress={this.onHide} >
        <View style={styles.absoluteFill}>
          <Animated.View
            style={[
              styles.wrapper,
              {
                height: this.aniVal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 380],
                })
              }
            ]}
          >
            <Text style={styles.startText}>Start Date:</Text>
            <CalendarList
              horizontal={true}
              pagingEnabled={true}
              markedDates={markedDates}
              calendarWidth={CALENDAR_WIDTH}
              hideExtraDays={false}
              onDayPress={onConfirmMove}
              calendarHeight={300}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: 'black',
                selectedDayBackgroundColor: '#5B99F8',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#5B99F8',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                arrowColor: 'orange',
                monthTextColor: 'black',
                indicatorColor: 'blue',
                textDayFontFamily: 'roboto',
                textMonthFontFamily: 'avenir-heavy',
                textMonthFontWeight: 'bold',
                textDayFontFamily: 'roboto',
                textDayFontSize: 11,
                textMonthFontSize: 15,
                textDayHeaderFontFamily: 'roboto',
                "stylesheet.calendar.header": {
                  dayHeader: {
                    fontWeight: 'bold',
                    fontSize: 10,
                    lineHeight: 33,
                    width: 10,
                    letterSpacing: 3,
                  },
                  monthText: {
                    fontWeight: 'bold',
                    fontSize: 15,
                    lineHeight: 33,
                  }
                },
                "stylesheet.day.basic": {
                  disabledText: {
                    color: 'black',
                    opacity: 0.4
                  },
                  text: {
                    fontSize: 10,
                    lineHeight: 33,
                  }
                },
                "stylesheet.calendar.main": {
                  container: {
                    paddingLeft: 0,
                    paddingRight: 0,
                  }
                },
                "stylesheet.calendar-list.main": {
                  calendar: {
                    paddingLeft: 0,
                    paddingRight: 0,
                  }
                }
              }}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}