import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  FlatList,
} from "react-native";
import styles from "./styles";
import { Colors } from "shared/theme";
import { TashLogoD, Back, Send } from "../../shared/assets/images";
import { Input, Button, Text, Badge, Textarea } from "native-base";
import { getHeight } from "utils/";
import { getWidth } from "utils/";
import { FontSize } from "../../shared/theme";
import { IconButton } from "shared/components/buttons";

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

export default ({
  user,
  navigation,
  sendMessage,
  history,
  getHistory,
  deleteMessagesReq,
}) => {
  const [cost, setCost] = useState(0);
  const [chars, setChars] = useState(0);
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [deleteMessages, setDeleteMessages] = useState([]);
  const onChange = (text) => {
    const charge =
      text && text.length > 160 ? Math.ceil(text.length / 160) * 10 : 10;
    setCost(charge);
    const len = text && text.length ? text.length : 0;
    setChars(len);
    setMessage(text);
  };
  useEffect(() => {
    getHistory();
  }, []);
  useEffect(() => {
    setDate(new Date());
  }, [history]);
  const balance = (parseInt(user.balance) - (parseInt(user.balance) % 10)) / 10;
  const handleSend = () => {
    if (balance < cost / 10) {
      Alert.alert("Warning", "Insufficent balance");
      return;
    }
    if (balance <= 0) {
      Alert.alert("Warning", "Insufficent balance");
    } else if (message === "") {
      Alert.alert("Warning", "Enter your message first");
    } else {
      sendMessage({ message, cost, userId: user._id });
      setMessage("");
      setCost(0);
      setChars(0);
    }
  };
  const deleteMsg = (item, existForDelete) => {
    if (deleteMessages.length > 0) {
      if (existForDelete) {
        const arr = deleteMessages.slice();
        const existedItemIndex = arr.indexOf(item._id);
        arr.splice(existedItemIndex, 1);
        setDeleteMessages(arr);
      } else {
        const arr = deleteMessages.slice();
        arr.push(item._id);
        setDeleteMessages(arr);
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <SafeAreaView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.wrapper}
            keyboardVerticalOffset={0}
          >
            <Header handleBack={() => navigation.goBack()}></Header>

            <View style={styles.welcomeUserWrap}>
              <Text style={styles.welcomeText}>Welcome </Text>
              <Text style={styles.userNameText}>{user.firstName}</Text>
            </View>

            <TouchableOpacity style={styles.cardBalance}>
              <Text style={styles.textMessageBal}>MESSAGE BALANCE</Text>
              <Text style={styles.balance}>{balance || 0}</Text>
            </TouchableOpacity>
            <View style={styles.card}>
              <Text style={styles.chatText}>CHAT</Text>
              {history && history.length > 0 && (
                <FlatList
                  key={date}
                  // style={styles.msgArea}
                  renderItem={({ item, index }) => {
                    const existForDelete = deleteMessages.find(
                      (e) => e === item._id
                    );
                    if (item.isDeleted) {
                      return null;
                    } else
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onLongPress={() => {
                            if (deleteMessages.length === 0) {
                              const arr = deleteMessages.slice();
                              arr.push(item._id);
                              setDeleteMessages(arr);
                            } else {
                              deleteMsg(item, existForDelete);
                            }
                          }}
                          onPress={() => {
                            deleteMsg(item, existForDelete);
                          }}
                          key={index}
                          style={
                            existForDelete
                              ? {
                                  ...styles.messageWrapper,
                                  //flexWrap: 'wrap-reverse',
                                  backgroundColor: "#f39696",
                                }
                              : index % 2 === 0
                              ? styles.messageWrapper
                              : {
                                  ...styles.messageWrapper,
                                  //flexWrap: 'wrap-reverse',
                                  backgroundColor: "#ead1f7",
                                }
                          }
                        >
                          <Text
                            style={[
                              styles.messageText,
                              { fontWeight: "bold", textAlign: "right" },
                            ]}
                          >{`${(item && item.message) || ""}`}</Text>
                          {item && item.adminReply && (
                            <Text style={[styles.messageText]}>{`${(item &&
                              item.adminReply) ||
                              ""}`}</Text>
                          )}
                        </TouchableOpacity>
                      );
                  }}
                  scrollEnabled={true}
                  inverted
                  keyExtractor={(item) => item.id}
                  data={[...history].reverse() || []}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              )}
              {deleteMessages && deleteMessages.length > 0 && (
                <View style={styles.deleteContainer}>
                  <IconButton
                    onPress={() => setDeleteMessages([])}
                    style={{
                      ...styles.deleteButton,
                      backgroundColor: Colors.itemUnavailableGrey,
                    }}
                    icon={<Text style={styles.cancelText}>CANCEL</Text>}
                  ></IconButton>
                  <IconButton
                    onPress={() => {
                      deleteMessagesReq({
                        userId: user._id,
                        messageIds: deleteMessages,
                      });
                      setTimeout(() => {
                        setDeleteMessages([]);
                      }, 1000);
                    }}
                    style={{ ...styles.deleteButton, backgroundColor: "red" }}
                    icon={<Text style={styles.deleteText}>DELETE</Text>}
                  ></IconButton>
                </View>
              )}
              <View>
                <View style={styles.inputContainer}>
                  <Input
                    value={message}
                    multiline
                    onChangeText={(text) => {
                      onChange(text);
                    }}
                    placeholderTextColor="#d5b3ec"
                    style={styles.input}
                    placeholder="Enter message here"
                  />
                  <Button onPress={handleSend} style={styles.loginButton}>
                    <Image source={Send} style={styles.sendImage} />
                  </Button>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "#2c0618",
                    paddingHorizontal: getWidth(10),
                    marginTop: 4,
                  }}
                >
                  {/* <Text
                    style={{
                      color: "#2c0618",
                      fontSize: getHeight(FontSize.large),
                    }}
                  >
                    Characters: {chars}
                  </Text> */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "#2c0618",
                        fontSize: getHeight(FontSize.large),
                      }}
                    >
                      Cost R{cost}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};
