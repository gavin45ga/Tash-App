import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from "screens/login";
import ForgotPassword from "screens/forgot-password";
import authedUserStack from "shared/authed-user-stack";

const Stack = createStackNavigator();
export const navigationRef = React.createRef();

const NavigationApp = (props) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!props.token ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: true }}
              name="ForgotPassword"
              component={ForgotPassword}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="AuthedUserStack"
              component={authedUserStack}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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

export default connect(stateSelector, bindActions)(NavigationApp);
