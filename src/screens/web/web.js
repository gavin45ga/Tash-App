import React from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, Alert } from "react-native";
import _ from "lodash";

export default ({ navigation, route }) => {
  const { url } = route.params;
  const _onLoad = (state) => {
    if (state.url.indexOf("process/cancel/") != -1) {
      setTimeout(() => {
        Alert.alert("Error", "Transaction cancelled by user");
        navigation.navigate("Homepage");
      }, 3000);
    }
    if (state.url.indexOf("/process/finish/") !== -1) {
      _.debounce(() => navigation.navigate("Homepage"), 5000)();
    }
  };
  return (
    <WebView
      on
      onNavigationStateChange={_onLoad}
      renderLoading={<ActivityIndicator color="white" />}
      source={{ uri: url }}
    />
  );
};
