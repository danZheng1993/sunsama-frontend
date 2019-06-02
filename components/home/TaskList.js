import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import moment from 'moment';
import get from 'lodash.get';

import { Card } from '../basic';

import { Queries } from '../../apollo';
import { secondaryTextColor } from '../styleConf';

const styles = {
  emptyWrapper: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: secondaryTextColor,
  },
  activityIndicator: {
    marginBottom: 20,
  }
}

class TaskList extends React.Component {
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
      this.props.data.refetch();
    }
  }

  updateInfo() {
    this.props.data.refetch();
  }

  renderEmptyState = () => {
    const { curDate } = this.props;
    return (
      <View style={styles.emptyWrapper}>
        <Text style={styles.emptyText}>No Tasks on {moment(curDate).format('YYYY-MM-DD')}</Text>
      </View>
    )
  }

  renderLoadingState = () => {
    const { curDate } = this.props;
    return (
      <View style={styles.emptyWrapper}>
        <ActivityIndicator size="large" style={styles.activityIndicator} />
        <Text style={styles.emptyText}>Loading Tasks for {moment(curDate).format('YYYY-MM-DD')}</Text>
      </View>
    )
  }

  renderItem = ({ item }) => {
    const { onMove, onRemove, onCheckCard } = this.props;
    const { _id } = item;
    return (
      <Card
        ref={this.setCardRef(_id)}
        task={item}
        onMove={onMove(_id)}
        onRemove={onRemove(_id)}
        onCheck={onCheckCard}
      />
    );
  }

  getData = () => {
    const { data } = this.props;
    const tasks = get(data, 'tasks.tasks', []);
    const result = [];
    tasks.forEach(el => {
      if (!el.checked) {
        result.push(el);
      }
    });
    tasks.forEach(el => {
      if (el.checked) {
        result.push(el);
      }
    });
    return result;
  }
  
  render() {
    const data = this.getData();
    const { loading } = this.props;
    return loading ? this.renderLoadingState() : (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmptyState()}
      />
    )
  }
}

export default graphql(
  Queries.tasksQuery,
  {
    options: props => {
      return {
        variables: { date: moment(props.curDate).format('YYYY-MM-DD') },
        fetchPolicy: 'network-only',
      };
    },
    withRef: true,
  }
)(TaskList);