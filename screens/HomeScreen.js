import React from 'react';
import { StyleSheet, View } from 'react-native';

import ScreenWrapper from '../components/basic/ScreenWrapper';
import Button from '../components/basic/Button';
import Card from '../components/basic/Card';
import DateSelector from '../components/home/DateSelector';
import Minimap from '../components/home/Minimap';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = { curDate: new Date() }

  onChangeDate = (curDate) => {
    this.setState({ curDate })
  }

  onMove = () => {
    if (this.minimap) {
      this.minimap.show();
    }
  }

  onRemove = () => {

  }

  onCancelMove = () => {

  }

  onConfirmMove = () => {
    
  }

  setMinimapRef = (ref) => { this.minimap = ref; }

  render() {
    const { curDate } = this.state;
    return (
      <ScreenWrapper>
        <DateSelector curDate={curDate} onChangeDate={this.onChangeDate} />
        <Button title="Add Task" />
        <Card
          task={{ title: 'Schedule demo with Airbnb', checked: false }}
          onMove={this.onMove}
          onRemove={this.onRemove}
        />
        <Card
          task={{ title: 'Review your design feedback on plan your day mockups', checked: false }}
          onMove={this.onMove}
          onRemove={this.onRemove}
        />
        <Card
          task={{ title: 'Review your design feedback on plan your day mockups', checked: true }}
        />
        <Minimap
          curDate={curDate}
          ref={this.setMinimapRef}
          onCancelMove={this.onCancelMove}
          onConfirmMove={this.onConfirmMove}
        />
      </ScreenWrapper>
    );
  }
}
