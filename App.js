import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Font, Icon } from 'expo';
import { PersistGate } from 'redux-persist/lib/integration/react';

import './ReactotronConfig';
import AppWrapper from './AppWrapper';
import store, { persistor } from './store';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <AppWrapper />
            </PersistGate>
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'avenir-light': require('./assets/fonts/avenir/light.otf'),
        'avenir-medium': require('./assets/fonts/avenir/medium.otf'),
        'avenir-heavy': require('./assets/fonts/avenir/heavy.otf'),
        'roboto': require('./assets/fonts/roboto/regular.ttf'),
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
