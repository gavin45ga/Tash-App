import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Homepage from "screens/homepage";
import Chat from "screens/Chat";
import Web from "screens/web";
import Settings from "screens/settings";
import OneSignal from "react-native-onesignal";

const MainStack = createStackNavigator();

const AuthedUserStack = (props) => {
  useEffect(() => {
    if (props?.email && props?.userId) {
      OneSignal.setLogLevel(6, 0);
      OneSignal.setAppId("f383e432-a98b-4c05-aae8-cafb11451b4c");
      // add fallbacktoSettings handler
      OneSignal.promptForPushNotificationsWithUserResponse(true);
      OneSignal.setExternalUserId(props.userId);
      OneSignal.setNotificationWillShowInForegroundHandler(
        (notificationReceivedEvent) => {
          let notification = notificationReceivedEvent.getNotification();
          notificationReceivedEvent.complete(notification);
        }
      );
    }
  }, []);

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Homepage"
        component={Homepage}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Chat"
        component={Chat}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Web"
        component={Web}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={Settings}
      />
    </MainStack.Navigator>
  );
};

const stateSelector = (state) => {
  return {
    token: state.auth?.token,
    userId: state.auth?.user?._id,
    email: state.auth?.user?.email,
  };
};

const bindActions = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(stateSelector, bindActions)(AuthedUserStack);
