import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
} from "react-native";
import { Colors } from "../../res";
const CustomAlert = (props) => {
  const [androidDefaults, setAndroidDefaults] = useState({
    container: {
      backgroundColor: Colors.white,
    },
    title: {
      color: Colors.black,
      fontSize: 20,
      fontWeight: "bold",
    },
    message: {
      color: Colors.black,
      fontSize: 14,
    },
    button: {
      color: Colors.primary,
      fontSize: 16,
      fontWeight: "500",
      backgroundColor: "transparent",
    },
  });
  const [iOSDefaults, setIOSDefaults] = useState({
    container: {
      backgroundColor: Colors.white,
    },
    title: {
      color: Colors.black,
      fontSize: 20,
      fontWeight: "bold",
    },
    message: {
      color: Colors.black,
      fontSize: 14,
    },
    button: {
      color: Colors.primary,
      fontSize: 17,
      fontWeight: "500",
      backgroundColor: "transparent",
    },
  });
  const AndroidButtonBox = () => {
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(1);
    const buttonProps =
      props.buttons && props.buttons.length > 0 ? props.buttons : [{}];

    return (
      <View
        style={[
          styles.androidButtonGroup,
          {
            flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
          },
        ]}
        onLayout={(e) => {
          if (e.nativeEvent.layout.height > 60) setButtonLayoutHorizontal(0);
        }}
      >
        {buttonProps.map((item, index) => {
          if (index > 2) return null;
          const alignSelfProperty =
            buttonProps.length > 2 &&
            index === 0 &&
            buttonLayoutHorizontal === 1
              ? "flex-start"
              : "flex-end";
          let defaultButtonText = "OK";
          if (buttonProps.length > 2) {
            if (index === 0) defaultButtonText = "ASK ME LATER";
            else if (index === 1) defaultButtonText = "CANCEL";
          } else if (buttonProps.length === 2 && index === 0)
            defaultButtonText = "CANCEL";
          return (
            <View
              key={index}
              style={[
                styles.androidButton,
                index === 0 && buttonLayoutHorizontal === 1 ? { flex: 1 } : {},
              ]}
            >
              <Pressable
                onPress={() => {
                  props.setModalVisible(false);
                  if (item.func && typeof item.func === "function") item.func();
                }}
                style={[
                  {
                    alignSelf: alignSelfProperty,
                  },
                ]}
              >
                <View
                  style={[
                    styles.androidButtonInner,
                    {
                      backgroundColor:
                        (item.styles && item.styles.backgroundColor) ||
                        androidDefaults.button.backgroundColor,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        (item.styles && item.styles.color) ||
                        androidDefaults.button.color,
                      fontSize:
                        (item.styles && item.styles.fontSize) ||
                        androidDefaults.button.fontSize,
                      fontWeight:
                        (item.styles && item.styles.fontWeight) ||
                        androidDefaults.button.fontWeight,
                    }}
                  >
                    {item.text || defaultButtonText}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };
  const IOSButtonBox = () => {
    const buttonProps =
      props.buttons && props.buttons.length > 0 ? props.buttons : [{}];
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(
      buttonProps.length === 2 ? 1 : 0
    );

    return (
      <View
        style={[
          styles.iOSButtonGroup,
          {
            flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
          },
        ]}
        onLayout={(e) => {
          if (e.nativeEvent.layout.height > 60) setButtonLayoutHorizontal(0);
        }}
      >
        {buttonProps.map((item, index) => {
          let defaultButtonText = "OK";
          if (buttonProps.length > 2) {
            if (index === 0) defaultButtonText = "ASK ME LATER";
            else if (index === 1) defaultButtonText = "CANCEL";
          } else if (buttonProps.length === 2 && index === 0)
            defaultButtonText = "CANCEL";
          const singleButtonWrapperStyle = {};
          let singleButtonWeight = iOSDefaults.button.fontWeight;
          if (index === buttonProps.length - 1) {
            singleButtonWeight = "700";
          }
          if (buttonLayoutHorizontal === 1) {
            singleButtonWrapperStyle.minWidth = "50%";
            if (index === 0) {
              singleButtonWrapperStyle.borderStyle = "solid";
              singleButtonWrapperStyle.borderRightWidth = 0.55;
              singleButtonWrapperStyle.borderRightColor = "#dbdbdf";
            }
          }
          return (
            <View
              key={index}
              style={[styles.iOSButton, singleButtonWrapperStyle]}
            >
              <Pressable
                onPress={() => {
                  props.setModalVisible(false);
                  if (item.func && typeof item.func === "function") item.func();
                }}
              >
                <View
                  style={[
                    styles.iOSButtonInner,
                    {
                      backgroundColor:
                        (item.styles && item.styles.backgroundColor) ||
                        iOSDefaults.button.backgroundColor,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        (item.styles && item.styles.color) ||
                        iOSDefaults.button.color,
                      fontSize:
                        (item.styles && item.styles.fontSize) ||
                        iOSDefaults.button.fontSize,
                      fontWeight:
                        (item.styles && item.styles.fontWeight) ||
                        singleButtonWeight,
                      textAlign: "center",
                    }}
                  >
                    {item.text || defaultButtonText}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <Pressable
        style={[
          Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
          styles.backdrop,
        ]}
        onPress={() => props.setModalVisible(false)}
      />
      <View style={styles.alertBox}>
        {Platform.OS === "ios" ? (
          <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
            <Text style={[styles.iOSTitle, iOSDefaults.title]}>
              {props.title || "Message"}
            </Text>
            <Text style={[styles.iOSMessage, iOSDefaults.message]}>
              {props.message || ""}
            </Text>
            <IOSButtonBox />
          </View>
        ) : (
          <View style={[styles.androidAlertBox, androidDefaults.container]}>
            <Text style={[styles.androidTitle, androidDefaults.title]}>
              {props.title || "Message"}
            </Text>
            <Text style={[styles.androidMessage, androidDefaults.message]}>
              {props.message || ""}
            </Text>
            <AndroidButtonBox />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.4,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  alertBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  androidAlertBox: {
    maxWidth: 280,
    width: "100%",
    margin: 48,
    elevation: 24,
    borderRadius: 2,
  },
  androidTitle: {
    margin: 24,
  },
  androidMessage: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 24,
  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,
  },
  androidButtonInner: {
    padding: 10,
  },

  iOSAlertBox: {
    maxWidth: 270,
    width: "100%",
    zIndex: 10,
    borderRadius: 13,
  },
  iOSTitle: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 7,
    paddingLeft: 16,
    marginTop: 8,
    textAlign: "center",
  },
  iOSMessage: {
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 21,
    paddingLeft: 16,
    textAlign: "center",
  },
  iOSButtonGroup: {
    marginRight: -0.55,
  },
  iOSButton: {
    borderTopColor: "#dbdbdf",
    borderTopWidth: 0.55,
    borderStyle: "solid",
  },
  iOSButtonInner: {
    minHeight: 44,
    justifyContent: "center",
  },
});
export default CustomAlert;
