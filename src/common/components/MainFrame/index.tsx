import React from "react";
import { SafeAreaView, StatusBar, StatusBarStyle, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import {SafeAreaView} from 'react-native-safe-area-context';
import { Colors, CommonStyles } from "../../res";
import Header from "../Header";

interface MainFrameProps {
  children?: React.ReactNode;
  contentContainerStyle?: {};
  scrollable?: boolean;
  containerStyle?: {};
  barStyle?: StatusBarStyle;
  backgroundColor?: string;
  showStatusBar?: boolean;
  header?: JSX.Element | React.ReactChild;
}

export const MainFrame: React.FunctionComponent<MainFrameProps> = ({
  children,
  contentContainerStyle,
  scrollable,
  containerStyle,
  barStyle = "light-content",
  backgroundColor,
  showStatusBar,
  header,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ backgroundColor: backgroundColor ?? Colors.primary,  }}
        edges={["top", "right", "left"]}
      />
      {/* <StatusBar
        translucent
        hidden={!showStatusBar}
        backgroundColor={backgroundColor ?? Colors.primary}
        barStyle={barStyle}
      /> */}
      {header && header}
      {scrollable ? (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={[
            { backgroundColor: Colors.halfWhite },
            containerStyle,
          ]}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View style={[{ backgroundColor: Colors.halfWhite }, containerStyle]}>
          {children}
        </View>
      )}
    </View>
  );
};

MainFrame.defaultProps = {
  showStatusBar: true,
  scrollable: false,
};
