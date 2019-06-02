import React from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import moment from 'moment';

import { ScreenWrapper } from '../components/basic';
import { DateSelector, Minimap, TaskList, AddTask } from '../components/home';

import { Logout } from '../store/actions/auth';

import { Mutations } from '../apollo';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    editingId: '',
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
    const { client } = this.props;
    client.mutate({
      mutation: Mutations.taskDeleteMutation,
      variables: { id },
      update: this.onUpdate,
    })
  }

  onCancelMove = () => {
    const { editingId } = this.state;
    if (this.taskList) {
      this.taskList.cancelMove(editingId);
    }
  }

  onConfirmMove = (date) => {
    const { editingId } = this.state;
    const { client } = this.props;
    if (this.minimap) {
      this.minimap.hide();
    }
    client.mutate({
      mutation: Mutations.taskUpdateMutation,
      variables: { id: editingId, time: date.dateString },
      update: this.onUpdate,
    });
  }

  onCheckCard = (id) => {
    const { client } = this.props;
    client.mutate({
      mutation: Mutations.taskUpdateMutation,
      variables: { id, checked: true },
      update: this.onUpdate,
    });
  }

  onUpdate = () => {
    if(this.taskList) {
      this.taskList.updateInfo();
    }
  }

  setMinimapRef = (ref) => { this.minimap = ref; }
  setTaskListRef = (ref) => { this.taskList = ref.wrappedInstance; }

  render() {
    const { curDate, Logout } = this.state;
    return (
      <ScreenWrapper>
        <DateSelector curDate={curDate} onChangeDate={this.onChangeDate} />
        <AddTask curDate={curDate} onUpdate={this.onUpdate} />
        <TaskList
          curDate={curDate}
          ref={this.setTaskListRef}
          onMove={this.onMove}
          onRemove={this.onRemove}
          onError={Logout}
          onCheckCard={this.onCheckCard}
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

const mapDispatchToProps = { Logout };

export default connect(null, mapDispatchToProps)(withApollo(HomeScreen));
