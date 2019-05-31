import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import set from 'lodash.set';

const { width } = Dimensions.get('screen');

const CALENDAR_WIDTH = width - 56;

export default class Calendar extends React.Component {
  aniVal = new Animated.Value(0);

  openCalendar() {
    Animated.timing(this.aniVal, {
      toValue: 1,
      duration: 500,
    }).start();
  }
  
  closeCalendar() {
    Animated.timing(this.aniVal, {
      toValue: 0,
      duration: 500,
    }).start();
  }

  render() {
    const { curDate, onSelectDate } = this.props;
    const markedDates = {};
    set(markedDates, moment(curDate).format('YYYY-MM-DD'), { selected: true });
    return (
      <Animated.View
        style={{
          height: this.aniVal.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300]
          })
        }}
      >
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          calendarWidth={CALENDAR_WIDTH}
          hideExtraDays={false}
          markedDates={markedDates}
          onDayPress={onSelectDate}
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
    )
  }
}