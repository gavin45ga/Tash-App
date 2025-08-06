import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "./styles";
import { Colors } from "shared/theme";
import { TashLogoD, Back } from "../../shared/assets/images";
import { Button, Text } from "native-base";
import { getHeight } from "utils/";
import { FontSize } from "../../shared/theme";
import { postRequest } from "api/axios";
import OneSignal from "react-native-onesignal";

const Header = ({ handleBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.iconWrapper}>
        <Image source={Back} style={styles.backImage} />
      </TouchableOpacity>
      <View>
        <Image source={TashLogoD} style={styles.logoIcon} />
      </View>
      <View style={styles.iconWrapper}></View>
    </View>
  );
};

export default ({ user, navigation, resetStore }) => {
  const [loading, setLoading] = useState(false);

  const onDeleteAccount = async () => {
    try {
      setLoading(true);
      const res = await postRequest("/user/delete-account", {
        userId: user?._id,
      });
      OneSignal.removeExternalUserId(() => {
        setLoading(false);
        resetStore();
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <SafeAreaView style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={styles.wrapper}
              keyboardVerticalOffset={0}
            >
              <Header handleBack={() => navigation.goBack()}></Header>

              <View style={styles.card}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: FontSize.xLarge,
                  }}
                >
                  Delete Account
                </Text>
                <Text>
                  Your account will be deleted permanently. Are you sure you
                  want to delete your account?
                </Text>
                <Button
                  style={{
                    backgroundColor: Colors.red,
                    marginTop: getHeight(10),
                    justifyContent: "center",
                  }}
                  onPress={onDeleteAccount}
                  disabled={loading}
                >
                  <Text style={{ color: Colors.white }}>
                    {loading ? "Deleting..." : "Delete Account"}
                  </Text>
                </Button>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </>
  );
};
