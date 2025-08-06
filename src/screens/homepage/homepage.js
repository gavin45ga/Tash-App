import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { Colors } from "shared/theme";
import { TashLogoD, Info, Edit } from "../../shared/assets/images";
import { Button, Text, Input } from "native-base";
import { config, baseUrl } from "../../config";
import OneSignal from "react-native-onesignal";

const Header = ({ handleLogout }) => {
  return (
    <View style={styles.header}>
      <View style={styles.iconWrapper}></View>
      <View>
        <Image source={TashLogoD} style={styles.logoIcon} />
      </View>
      <View style={styles.iconWrapper}>
        <TouchableOpacity
          onPress={() => {
            OneSignal.removeExternalUserId(() => {
              handleLogout();
            });
          }}
        >
          <Text style={styles.logoutStyle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ({ navigation, user, resetStore, route, getHistory }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const balance = (parseInt(user.balance) - (parseInt(user.balance) % 10)) / 10;
  const tranResult = route && route.params && route.params.tranResult;
  if (tranResult) {
    Alert.alert("Success", tranResult);
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          <Header
            handleLogout={() => {
              resetStore();
            }}
          ></Header>
          <View style={styles.welcomeUserWrap}>
            <Text style={styles.welcomeText}>Welcome </Text>
            <Text style={styles.userNameText}>{user.firstName}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <Image
                source={Edit}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.creditBalText}>MESSAGE BALANCE</Text>
              <View style={styles.cardBalance}>
                <Text style={styles.balance}>{balance || 0}</Text>
              </View>
            </View>
            <View style={styles.descriptionWrap}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={Info} style={styles.infoIcon} />
                <Text style={styles.walletInfo}> MESSAGE BALANCE INFO</Text>
              </View>
              <Text style={styles.walletDesInfo}>
                R10.00 per Message (160 characters)
              </Text>
              <View style={styles.tw}>
                {[10, 20, 50, 100].map((itm, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setToken(itm)}
                      key={index}
                      style={[
                        styles.tc,
                        {
                          backgroundColor: token === itm ? "#691aa0" : "white",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: token === itm ? "white" : "black",
                          fontWeight: "bold",
                        }}
                      >
                        R{itm}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.inputContainer}>
                <Input
                  value={token}
                  onChangeText={(text) => {
                    setToken(text);
                  }}
                  keyboardType="number-pad"
                  placeholder={"Enter amount here"}
                  placeholderTextColor="#d5b3ec"
                  style={styles.input}
                />
              </View>
            </View>
            <Button
              onPress={() => {
                const {
                  payfast_live: { merchant_id, merchant_key, url },
                } = config;
                const params = {
                  merchant_id,
                  merchant_key,
                  amount: token,
                  item_name: "Tash wallet recharge",
                  notify_url: `${baseUrl}/api/payment`,
                  email_address: user.email,
                  userId: user._id,
                };

                const formData = new FormData();
                for (const k in params) {
                  formData.append(k, params[k]);
                }
                if (token && token % 10 === 0) {
                  setLoading(true);
                  fetch(url, {
                    method: "POST",
                    redirect: "manual",
                    "Content-Type":
                      "application/x-www-form-urlencoded; charset=UTF-8",
                    body: formData,
                  })
                    .then((res) => {
                      navigation.navigate("Web", {
                        url: res.url,
                      });
                      setToken(null);
                      setLoading(false);
                    })
                    .catch((err) => {
                      setToken(null);
                      setLoading(false);
                      Alert.alert(
                        "Error",
                        "Error while redirecting to payment gateway. Try again later"
                      );
                      console.log("Payment error", err);
                    })
                    .finally(() => {
                      setToken(null);
                      setLoading(false);
                    });
                } else if (token && token % 10 !== 0) {
                  Alert.alert(
                    "Warning",
                    "Select or enter amount in multiple of 10"
                  );
                } else {
                  Alert.alert("Warning", "Select or enter amount to recharge");
                }
              }}
              style={styles.loginButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Text>Processing Transaction</Text>
                  <ActivityIndicator color="#ffffff" />
                </>
              ) : (
                <Text style={styles.btnText}>ADD BALANCE</Text>
              )}
            </Button>
          </View>
          <View style={styles.btnConatiner}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat")}
              style={styles.askNowButton}
            >
              <Text style={styles.askText}>Ask a Question</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                getHistory();
                navigation.navigate("Chat");
              }}
              style={styles.askNowButton}
            >
              <Text style={styles.askText}>View Messages</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
