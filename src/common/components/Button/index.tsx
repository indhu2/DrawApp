import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../res";
import { moderateScale } from "../../utils/ScreenRatio";

interface ButtonViewProps {
  buttonText?: string;
  onButtonPress?: () => void;
  style?: {};
  textStyle?: {};
  isPressable?: boolean;
}

const ButtonView = ({
  isPressable,
  buttonText,
  onButtonPress,
  style,
  textStyle,
}: ButtonViewProps) => {
  if (isPressable) {
    return (
      <TouchableOpacity
        onPress={onButtonPress}
        style={[styles.buttonStyle, style]}
      >
        <Text style={[{ color: Colors.white }, textStyle]}>{buttonText}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.buttonStyle, style]}>
        <Text style={[{ color: Colors.white }, textStyle]}>{buttonText}</Text>
      </View>
    );
  }
};

ButtonView.defaultProps = {
  buttonText: "",
  style: {},
  textStyle: {},
  isPressable: false,
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default ButtonView;
