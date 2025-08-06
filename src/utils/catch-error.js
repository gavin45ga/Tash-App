// file needs to be checked with status code
import { Alert } from "react-native";
import { loadingAction } from "shared/store/actions";

let isAlertVisible = false;

export const catchError = (onSuccess, onError) => (obj) => {
  if (obj) {
    const { data } = obj;
    const status = Number(data.response.status);
    if (status === 200 || status === 304) {
      onSuccess(data.response);
    } else {
      let message = status === 401 ? "Unauthorised Request" : "Unknown Error";
      loadingAction(false);
      // eslint-disable-next-line prefer-destructuring
      if (data.response.message) message = data.response.message;
      if (status === 400 && !isAlertVisible) {
        // isAlertVisible = true;
        Alert.alert("Error", message, [
          {
            text: "OK",
            onPress: () => {
              isAlertVisible = false;
            },
            style: "cancel",
          },
        ]);
      }
      onError(message);
    }
  }
};
