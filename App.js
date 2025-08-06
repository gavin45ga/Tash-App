import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'shared/store/store';
import NavigationApp from 'shared/navigation';
console.disableYellowBox = true;

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationApp />
      </Provider>
    );
  }
}
