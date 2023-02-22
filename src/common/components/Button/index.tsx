import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../res";

interface ButtonViewProps {
    buttonText?: string;
    onButtonPress?: () => void;
    style?: {};
    isPressable?: boolean;
}

const ButtonView = ({buttonText, style}: ButtonViewProps) => {
  return (
    <View style={[styles.buttonStyle,style]}>
      <Text style={{ color: Colors.white }}>{buttonText}</Text>
    </View>
  );
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
