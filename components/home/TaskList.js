import React from 'react';
import { FlatList } from 'react-native';

import { Card } from '../basic';

export class TaskList extends React.Component {
  constructor() {
    super();
    this.card = {};
  }

  keyExtractor = ({ _id }) => {
    return _id;
  }

  setCardRef = id => (ref) => { this.card[id] = ref };

  cancelMove(id) {
    if (this.card[id]) {
      this.card[id].resetMove();
      this.props.refetch();
    }
  }

  renderItem = ({ item }) => {
    const { onMove, onRemove } = this.props;
    const { _id } = item;
    return (
      <Card
        ref={this.setCardRef(_id)}
        task={item}
        onMove={onMove(_id)}
        onRemove={onRemove(_id)}
      />
    );
  }
  
  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}