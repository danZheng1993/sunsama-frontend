import React from 'react';
import { View, Text, PanResponder, Animated, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { foregroundColor, primaryTextColor, deactiveColor, activeColor, shadowProps, positiveColor, negativeColor } from '../styleConf';

const { width } = Dimensions.get('screen');

const MOVING_LIMIT = width - 28;

const styles = {
  wrapper: {
    borderRadius: 4,
    marginBottom: 10,
    ...shadowProps,
    width: '100%',
  },
  content: {
    width: '100%',
    backgroundColor: foregroundColor,
    padding: 12,
    borderRadius: 4,
  },
  text: {
    fontFamily: 'avenir-medium',
    fontSize: 14,
    color: primaryTextColor,
    marginBottom: 6,
    marginRight: 30,
  },
  checked: {
    opacity: 0.4,
  },
  bgCard: (status) => ({
    position: 'absolute',
    backgroundColor: status === 'move' ? positiveColor : negativeColor,
    borderRadius: 4,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: status === 'move' ? 'flex-start' : 'flex-end',
    paddingHorizontal: 22,
  }),
  bgText: {
    color: foregroundColor,
    fontFamily: 'avenir-medium',
    fontSize: 10,
    lineHeight: 33,
    textTransform: 'capitalize',
  }
};

export class Card extends React.Component {
  constructor(props) {
    super(props);
    const { task: { checked } } = this.props;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !checked,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (!checked) {
          const { dx, dy } = gestureState;
          return dx > 10 || dx < -10 || dy > 10 || dy < -10;
        }
        return false;
      },
      onMoveShouldSetPanResponderCapture: () => !checked,
      onPanResponderMove: (evt, gestureState) => {
        const { status } = this.state;
        const { dx } = gestureState;
        this.horizontalAnival.setValue(dx);
        if (dx >= 0) {
          if (status !== 'move') {
            this.setState({ status: 'move' });
          }
        } else {
          if (status !== 'delete') {
            this.setState({ status: 'delete' });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx >= 100) {
          this.move();
        } else if(dx <= -100) {
          this.remove();
        } else {
          this.resetMove();
        }
      },
      onShouldBlockNativeResponder: () => true,
    });
  }

  onMove = () => {
    this.props.onMove();
  }

  onRemove = () => {
    Alert.alert('Delete ?', "You can't undo this action.", [
      { text: 'Cancel', onPress: () => this.resetMove() },
      {
        text: 'Delete',
        onPress: this.props.onRemove,
      },
    ]);
  }

  onPress = () => {
    const { task: { _id }, onCheck } = this.props;
    onCheck(_id);
  }

  resetMove() {
    Animated.timing(this.horizontalAnival, {
      toValue: 0,
      duration: 500,
    }).start();
  }

  move() {
    Animated.timing(this.horizontalAnival, {
      toValue: MOVING_LIMIT,
      duration: 500,
    }).start(() => {
      this.onMove();
    });
  }

  remove() {
    Animated.timing(this.horizontalAnival, {
      toValue: -MOVING_LIMIT,
      duration: 500,
    }).start(() => {
      this.onRemove();
    });
  }

  state = { status: 'move' };
  horizontalAnival = new Animated.Value(0);

  render() {
    const { task: { _id, title, checked }, onPress, onCheck } = this.props;
    const { status } = this.state;
    return (
      <View style={styles.wrapper}>
        {!checked && (
          <View style={styles.bgCard(status)}>
            <Text style={styles.bgText}>{status}</Text>
          </View>
        )}
        <Animated.View
          style={[
            styles.content,
            checked && styles.checked,
            { marginLeft: this.horizontalAnival }
          ]}
          {... (!checked ? this.panResponder.panHandlers : {})}
        >
          <Text numberOfLines={5} ellipsizeMode="tail" style={styles.text}>{title}</Text>
          <TouchableOpacity disabled={checked} onPressIn={this.onPress}>
            { checked ? (
              <Ionicons name="ios-checkmark-circle" color={activeColor} size={20} />
            ) : (
              <Ionicons name="ios-checkmark-circle-outline" color={deactiveColor} size={20} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}