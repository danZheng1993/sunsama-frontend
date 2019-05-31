import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { SignupForm } from '../components/login';

const styles = {
  wrapper: {}
}

class SignupScreen extends React.Component {
  
  onLogin = () => {
    this.props.navigation.navigate('Login');
  }

  onRegister = (email, password) => {
    
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SignupForm onLogin={this.onLogin} onRegister={this.onRegister} />
      </View>
    )
  }
}

export default withNavigation(SignupScreen);