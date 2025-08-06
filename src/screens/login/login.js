import React, { useState, useCallback, useEffect } from "react";
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
import { TashLogoD } from "../../shared/assets/images";
import { Input, Form, Button, Text, Item, Spinner } from "native-base";

const signUpData = [
  { label: "First name", name: "firstName" },
  { label: "Last name", name: "lastName" },
  { label: "Email", name: "email" },
  { label: "DD-MM-YYYY", name: "dateOfBirth" },
  { label: "Password", name: "password", secure: true },
];
const signInData = [
  { label: "Email", name: "email" },
  { label: "Password", name: "password", secure: true },
];

const errorMessages = {
  firstName: "Enter valid first name",
  lastName: "Enter valid last name",
  dateOfBirth: "Enter valid date of birth (DD-MM-YYYY)",
  email: "Enter valid email address",
  password: "Enter valid  6 digit password",
};

const RenderInputs = ({ isSignUp, onChange, values, errors }) => {
  const inputsData = isSignUp ? signUpData : signInData;
  return inputsData.map((data, inx) => {
    return (
      <View>
        <Item
          key={inx}
          style={[styles.inputContainer, { borderColor: "#b57ddc" }]}
          rounded
          error
          fixedLabel
        >
          <Input
            value={values[data.name]}
            secureTextEntry={Boolean(data.secure)}
            onChangeText={(text) => onChange({ [data.name]: text })}
            placeholder={data.label}
            placeholderTextColor="#d5b3ec"
            style={styles.input}
          />
        </Item>
        {errors[data.name] && (
          <Text style={styles.errorStyle}>{errorMessages[data.name]}</Text>
        )}
      </View>
    );
  });
};

const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  password: "",
};

export default (props) => {
  const [isSignUp, setAuthTab] = useState(true);
  const [inputValue, setInputValue] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {}, [props.isLoading]);

  const handleSubmit = () => {
    const fieldErrors = validateFields(isSignUp, inputValue);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
    } else {
      if (isSignUp) {
        const newInput = {
          dateOfBirth: inputValue["dateOfBirth"],
          email: inputValue["email"].toLowerCase(),
          firstName: inputValue["firstName"],
          lastName: inputValue["lastName"],
          password: inputValue["password"],
        };
        props.handleSignup(newInput);
      } else {
        props.handleLogin({
          email: inputValue["email"].toLowerCase(),
          password: inputValue["password"],
        });
      }
    }
  };

  const toggleAuthTab = useCallback((value) => {
    setInputValue(initialValues);
    setErrors({});
    setAuthTab(value);
  });

  return (
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
                <View style={styles.authWrapper}>
                  <TouchableOpacity
                    onPress={() => toggleAuthTab(false)}
                    style={styles.authLoginTextWrap}
                  >
                    <Text
                      style={
                        isSignUp
                          ? styles.authText
                          : { ...styles.authText, ...styles.activeTab }
                      }
                    >
                      LOGIN
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleAuthTab(true)}
                    style={styles.authSignUpTextWrap}
                  >
                    <Text
                      style={
                        isSignUp
                          ? { ...styles.authText, ...styles.activeTab }
                          : styles.authText
                      }
                    >
                      SIGNUP
                    </Text>
                  </TouchableOpacity>
                </View>
                <Form style={{ backgroundColor: "white" }}>
                  <RenderInputs
                    errors={errors}
                    values={inputValue}
                    onChange={(data) =>
                      setInputValue((prev) => {
                        if (data.dateOfBirth) {
                          let temp = data.dateOfBirth;
                          if (temp.length === 2 || temp.length === 5) {
                            temp += "-";
                          }
                          data.dateOfBirth = temp;
                          return { ...prev, ...data };
                        } else {
                          return { ...prev, ...data };
                        }
                      })
                    }
                    isSignUp={isSignUp}
                  />
                  {!isSignUp && (
                    <TouchableOpacity
                      style={styles.loginCWrapper}
                      onPress={() => {
                        props.navigation.navigate("ForgotPassword");
                      }}
                    >
                      <Text style={styles.loginContent}>Forgot password?</Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.loginButtonConatiner}>
                    <Button
                      disabled={props.isLoading}
                      onPress={handleSubmit}
                      style={styles.loginButton}
                    >
                      {props.isLoading ? (
                        <Spinner color={Colors.white} />
                      ) : (
                        <Text style={styles.btnText}>
                          {isSignUp ? "SIGNUP" : "LOGIN"}
                        </Text>
                      )}
                    </Button>
                  </View>
                </Form>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const validateFields = (isSignup, fields) => {
  const errors = {};

  if (isSignup) {
    if (!fields.firstName) {
      errors.firstName = true;
    }
    if (!fields.lastName) {
      errors.lastName = true;
    }
    const dobRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    if (
      !fields.dateOfBirth ||
      (fields.dateOfBirth && !dobRegex.test(fields.dateOfBirth))
    ) {
      errors.dateOfBirth = true;
    }
  }
  if (!fields.email || !validateEmail(fields.email)) {
    errors.email = true;
  }
  if (!fields.password || (fields.password && fields.password.length < 6)) {
    errors.password = true;
  }
  return errors;
};

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
