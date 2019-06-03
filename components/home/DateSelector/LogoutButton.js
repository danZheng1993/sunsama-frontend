import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { Logout } from '../../../store/actions/auth';

class LogoutButton extends React.Component {
  render() {
    const { Logout } = this.props;
    return (
      <TouchableOpacity onPress={Logout}>
        <Ionicons name="ios-log-out" size={30} />
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = { Logout };

export default connect(null, mapDispatchToProps)(LogoutButton);