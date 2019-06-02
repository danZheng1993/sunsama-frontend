import React from 'react';
import { connect } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { AuthStack, HomeStack } from './navigation';
import { initApolloClient } from './apollo';

class AppWrapper extends React.Component {
  render() {
    const { authToken } = this.props;
    if (authToken === '') {
      const client = initApolloClient();
      return (
        <ApolloProvider client={client}>
          <AuthStack />
        </ApolloProvider>
      )
    }
    const client = initApolloClient(authToken);
    return (
      <ApolloProvider client={client}>
        <HomeStack />
      </ApolloProvider>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
});

export default connect(mapStateToProps)(AppWrapper);
