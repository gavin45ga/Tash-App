import { AsyncStorage } from "react-native";

export const getItem = (key) =>
  new Promise(async (resolve, reject) => {
    await AsyncStorage.getItem(key, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

export const setItem = (key, value) =>
  new Promise(async () => {
    await AsyncStorage.setItem(key, value);
  });

export const clearItem = (key) =>
  new Promise(async (resolve, reject) => {
    await AsyncStorage.removeItem(key, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
