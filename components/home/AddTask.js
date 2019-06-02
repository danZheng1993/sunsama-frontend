import React from 'react';
import { View, Modal, StatusBar } from 'react-native';
import { graphql } from 'react-apollo';
import moment from 'moment';

import { Button, Input } from '../basic';

import { Mutations } from '../../apollo';

class AddTask extends React.Component {
  state = { showModal: false, title: '', description: '' };
  onChangeTitle = (title) => { this.setState({ title }) };
  onChangeDescription = (description) => { this.setState({ description }) };

  showModal = () => { this.setState({ showModal: true, title: '', description: '' }); }
  hideModal = () => { this.setState({ showModal: false }); }

  submitData = () => {
    const { title, description } = this.state;
    const { curDate, mutate } = this.props;
    mutate({ variables: { title, description, time: moment(curDate).format('YYYY-MM-DD') } });
    this.hideModal();
  }

  render() {
    const { showModal } = this.state;
    return (
      <View>
        <Button title="Add Task" onPress={this.showModal} />
        <Modal
          visible={showModal}
          onRequestClose={this.hideModal}
        >
          <View style={{ padding: 28 }}>
            <StatusBar />
            <Input placeholder="Title" onChangeText={this.onChangeTitle} />
            <Input placeholder="Description" numberOfLine={5} onChangeText={this.onChangeDescription} />
            <Button title="Confirm" type="primary" onPress={this.submitData} />
            <Button title="Cancel" type="cancel" onPress={this.hideModal} />
          </View>
        </Modal>
      </View>
    )
  }
}

export default graphql(
  Mutations.taskAddMutation,
  {
    options: props => ({
      onCompleted: props.onUpdate
    }),
    withRef: true,
  },
)(AddTask);