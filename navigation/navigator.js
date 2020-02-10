import React from 'react';
import { View, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from '../store/create_store';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async loadAssetsAsync() {
    await Font.loadAsync({
        'Roboto': require('../assets/fonts/Roboto.ttf'),
        'Roboto_medium': require('../assets/fonts/Roboto_medium.ttf'),
      });
  }

  render() {
    // return (
    //   <AppLoading
    //     startAsync={this.loadAssetsAsync}
    //     onFinish={() => this.setState({ isReady: true })}
    //     onError={console.warn}
    //   />
    // );

    if (!this.state.isReady) {
        return (
          <AppLoading
            startAsync={this.loadAssetsAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
        );
      }else{
        return (
          <Provider store = { store }>
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
              {/*<AppContainer />*/}
            </View>
          </Provider>
        );
      }
  }
}