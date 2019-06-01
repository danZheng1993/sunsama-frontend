import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { withNavigation } from 'react-navigation';

import { SignupForm } from '../components/login';

import { Signup } from '../store/actions/auth';

const styles = {
  wrapper: {}
}

class SignupScreen extends React.Component {
  
  onLogin = () => {
    this.props.navigation.navigate('Login');
  }

  onRegister = (name, email, password) => {
    const { client, Signup } = this.props;
    Signup({ client, name, email, password });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SignupForm onLogin={this.onLogin} onRegister={this.onRegister} />
      </View>
    )
  }
}

const mapDispatchToProps = { Signup }

export default withApollo(withNavigation(connect(null, mapDispatchToProps)(SignupScreen)));