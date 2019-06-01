import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';

import { LoginForm } from '../components/login';

import { Login } from '../store/actions/auth';

const styles = {
  wrapper: {}
}

class LoginScreen extends React.Component {
  
  onLogin = (email, password) => {
    const { client, Login } = this.props;
    Login({ client, email, password });
  }

  onRegister = () => {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />
      </View>
    )
  }
}

export const mapDispatchToProps = { Login };

export default withNavigation(connect(null, mapDispatchToProps)(withApollo(LoginScreen)));