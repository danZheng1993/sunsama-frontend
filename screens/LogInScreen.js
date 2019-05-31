import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { LoginForm } from '../components/login';

const styles = {
  wrapper: {}
}

class LoginScreen extends React.Component {
  
  onLogin = (email, password) => {

  }

  onRegister = () => {
    this.props.navigation.navigate('Signup')
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />
      </View>
    )
  }
}

export default withNavigation(LoginScreen);