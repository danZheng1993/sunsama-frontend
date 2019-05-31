import React from 'react';
import { View } from 'react-native';

import { Input, Button } from '../basic';
import { foregroundColor } from '../styleConf';

const styles = {
  wrapper: {
    backgroundColor: foregroundColor,
    padding: 16,
  },
}

export class LoginForm extends React.Component {
  state = { email: '', password: '' };

  onChangeEmail = (email) => { this.setState({ email }); }

  onChangePassword = (password) => { this.setState({ password }); }

  onLogin = () => {
    const { email, password } = this.state;
    this.props.onLogin(email, password);
  }

  render() {
    const { onRegister } = this.props;
    return (
      <View style={styles.wrapper}>
        <Input placeholder="User Email" onChangeText={this.onChangeEmail} />
        <Input placeholder="Password" secureTextEntry onChangeText={this.onChangePassword} />
        <Button title="Login" type="primary" onPress={this.onLogin} />
        <Button title="Register" type="secondary" onPress={onRegister} />
      </View>
    )
  }
}
