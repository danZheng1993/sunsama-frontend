import React from 'react';
import { View, Alert } from 'react-native';

import { Input, Button } from '../basic';
import { foregroundColor } from '../styleConf';

const styles = {
  wrapper: {
    backgroundColor: foregroundColor,
    padding: 16,
  },
}

export class SignupForm extends React.Component {
  state = { email: '', password: '', cPassword: '' };

  onChangeEmail = (email) => { this.setState({ email }); }

  onChangePassword = (password) => { this.setState({ password }); }
  onChangeConfirmPassword = (cPassword) => { this.setState({ cPassword }); }

  onRegister = () => {
    const { email, cPassword, password } = this.state;
    if (email === '') {
      Alert.alert('Email cannot be empty');
      return;
    }
    if (password === '') {
      Alert.alert('Password cannot be empty');
      return;
    }
    if (cPassword !== password) {
      Alert.alert('Password mismatch');
      return;
    }
    this.props.onRegister(email, password);
  }

  render() {
    const { onLogin } = this.props;
    return (
      <View style={styles.wrapper}>
        <Input placeholder="User Email" onChangeText={this.onChangeEmail} />
        <Input placeholder="Password" secureTextEntry onChangeText={this.onChangePassword} />
        <Input placeholder="Confirm Password" secureTextEntry onChangeText={this.onChangeConfirmPassword} />
        <Button title="Register" type="secondary" onPress={this.onRegister} />
        <Button title="Login" type="primary" onPress={onLogin} />
      </View>
    )
  }
}
