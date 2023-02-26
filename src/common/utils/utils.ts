import { Alert, Platform, ToastAndroid } from "react-native";
import { openSettings } from "react-native-permissions";

export const isIos = Platform.OS === "ios";

export const showToast = (message: string) => {
  if (!isIos) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert(message);
  }
};
