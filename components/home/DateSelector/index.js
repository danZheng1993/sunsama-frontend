import React from 'react';
import { View } from 'react-native';

import DatePicker from './DatePicker';
import Calendar from './Calendar';

const styles = {
  wrapper: {
    flexDirection: 'column',
    marginBottom: 50,
  }
}

export class DateSelector extends React.Component {
  onOpen = () => {
    if (this.calendar) {
      this.calendar.openCalendar();
    }
  }

  onClose = () => {
    if (this.calendar) {
      this.calendar.closeCalendar();
    }
  }

  openSelector() {
    if (this.calendar && this.datePicker) {
      this.calendar.openCalendar();
      this.datePicker.openPicker();
    }
  }

  closeSelector() {
    if (this.calendar && this.datePicker) {
      this.calendar.closeCalendar();
      this.datePicker.closePicker();
    }
  }

  onSelectDate = (date) => {
    this.props.onChangeDate(date.dateString);
    this.closeSelector();
  }

  setCalendarRef = (ref) => { this.calendar = ref; }

  setDatePickerRef = (ref) => { this.datePicker = ref; }

  render() {
    const { curDate } = this.props;
    return (
      <View style={styles.wrapper}>
        <DatePicker ref={this.setDatePickerRef} curDate={curDate} onOpen={this.onOpen} onClose={this.onClose} />
        <Calendar ref={this.setCalendarRef} curDate={curDate} onSelectDate={this.onSelectDate} />
      </View>
    )
  }
}