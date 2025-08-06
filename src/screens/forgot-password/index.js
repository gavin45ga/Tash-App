import React, { useState } from "react";
import styles from "screens/login/styles";
import { Colors } from "shared/theme";
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TashLogoD } from "../../shared/assets/images";
import { Input, Form, Button, Text, Item, Spinner } from "native-base";
import { postRequest } from "api/axios";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [screen, setScreen] = useState(1);

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setIsPending(false);
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
      const res = await postRequest("/user/generateOTP", { email });
      setIsPending(false);
      if (res?.data?.message === "OTP generated successfully") {
        setScreen(2);
      } else {
      }
    }
  };

  const onChangePassword = async () => {
    setIsPending(true);
    if (newPassword.length > 6 && otp !== "") {
      const res = await postRequest("/user/reset-password", {
        email,
        otp,
        password: newPassword,
      });
      setIsPending(false);
      if (res?.data?.message === "Invalid OTP") {
        alert("Invalid OTP");
      } else if (res?.data?.message === "Password reset successfully") {
        props?.navigation?.navigate("Login");
        alert("Password changed successfully");
        setScreen(1);
      } else {
        alert(res?.data?.message || "Something went wrong");
      }
    } else {
      setIsPending(false);
      if (newPassword.length < 6) {
        setNewPasswordError("Password must be atleast 6 characters long");
      }
      if (otp === "") {
        setOTPError("OTP is required");
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <KeyboardAvoidingView style={[styles.wrapper]}>
          <SafeAreaView style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inputWrapper}>
                <View style={styles.logo}>
                  <View style={styles.logoWrapper}>
                    <View style={styles.logoInWrap}>
                      <Image source={TashLogoD} style={styles.logoIcon} />
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  {screen === 1 && (
                    <Form style={{ backgroundColor: "white" }}>
                      <View style={styles.loginButtonConatiner}>
                        <View>
                          <Item
                            style={[
                              styles.inputContainer,
                              { borderColor: "#b57ddc" },
                            ]}
                            rounded
                            error
                            fixedLabel
                          >
                            <Input
                              value={email}
                              onChangeText={(text) => setEmail(text)}
                              placeholder="Email"
                              placeholderTextColor="#d5b3ec"
                              style={styles.input}
                            />
                          </Item>
                          {!!emailError && (
                            <Text style={styles.errorStyle}>{emailError}</Text>
                          )}
                        </View>
                        <Button
                          style={[
                            styles.loginButton,
                            {
                              marginTop: 10,
                            },
                          ]}
                          onPress={handleSubmit}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Spinner color="#fff" />
                          ) : (
                            <Text style={styles.btnText}>Send OTP</Text>
                          )}
                        </Button>
                      </View>
                    </Form>
                  )}
                  {screen === 2 && (
                    <Form style={{ backgroundColor: "white" }}>
                      <View style={styles.loginButtonConatiner}>
                        <View>
                          <Item
                            style={[
                              styles.inputContainer,
                              { borderColor: "#b57ddc" },
                            ]}
                            rounded
                            error
                            fixedLabel
                          >
                            <Input
                              value={otp}
                              onChangeText={(text) => setOTP(text)}
                              placeholder="OTP"
                              placeholderTextColor="#d5b3ec"
                              style={styles.input}
                            />
                          </Item>
                          {!!otpError && (
                            <Text style={styles.errorStyle}>{otpError}</Text>
                          )}
                        </View>
                        <View>
                          <Item
                            style={[
                              styles.inputContainer,
                              { borderColor: "#b57ddc" },
                            ]}
                            rounded
                            error
                            fixedLabel
                          >
                            <Input
                              secureTextEntry={true}
                              value={newPassword}
                              onChangeText={(text) => setNewPassword(text)}
                              placeholder="New Password"
                              placeholderTextColor="#d5b3ec"
                              style={styles.input}
                            />
                          </Item>
                          {!!newPasswordError && (
                            <Text style={styles.errorStyle}>
                              {newPasswordError}
                            </Text>
                          )}
                        </View>
                        <Button
                          style={[
                            styles.loginButton,
                            {
                              marginTop: 10,
                            },
                          ]}
                          onPress={onChangePassword}
                        >
                          {isPending ? (
                            <Spinner color="#fff" />
                          ) : (
                            <Text style={styles.btnText}>Change Password</Text>
                          )}
                        </Button>
                      </View>
                    </Form>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
