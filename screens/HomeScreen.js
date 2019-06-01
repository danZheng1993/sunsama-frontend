import React from 'react';
import { Text } from 'react-native';
import { Query, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import get from 'lodash.get';

import { ScreenWrapper, Button, Card } from '../components/basic';
import { DateSelector, Minimap, TaskList } from '../components/home';

import { Queries } from '../apollo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = { curDate: new Date() }

  onChangeDate = (curDate) => {
    this.setState({ curDate })
  }

  onMove = id => () => {
    this.setState({ editingId: id });
    if (this.minimap) {
      this.minimap.show();
    }
  }

  onRemove = id => () => {
    console.log(id);
  }

  onCancelMove = () => {
    const { editingId } = this.state;
    if (this.minimap) {
      this.taskList.cancelMove(editingId);
    }
  }

  onConfirmMove = (date) => {
    console.log(date);
  }

  setMinimapRef = (ref) => { this.minimap = ref; }
  setTaskListRef = (ref) => { this.taskList = ref; }

  render() {
    const { curDate } = this.state;
    return (
      <ScreenWrapper>
        <DateSelector curDate={curDate} onChangeDate={this.onChangeDate} />
        <Query
          query={Queries.tasksQuery}
          fetchPolicy="cache-first"
          variables={{ date: moment(curDate).format('YYYY-MM-DD') }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <Text>Loading</Text>;
            if (error) { console.log(error); return false;}
            return (
              <TaskList
                ref={this.setTaskListRef}
                data={get(data, 'tasks.tasks', [])}
                refetch={refetch}
                onMove={this.onMove}
                onRemove={this.onRemove}
              />
            );
          }}
        </Query>
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
