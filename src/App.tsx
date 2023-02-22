import React, {useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";

import RNSketchCanvas from "@terrylinla/react-native-sketch-canvas";
import { showToast } from "./common/utils/utils";
import { Colors, Strings } from "./common/res";
import ButtonView from "./common/components/Button";

const App = () => {
  const backAction = () => {
    BackHandler.exitApp()
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <RNSketchCanvas
          containerStyle={styles.subContainer}
          canvasStyle={styles.subContainer}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          closeComponent={
            <ButtonView buttonText={Strings.actions.close}/>
          }
          undoComponent={
            <ButtonView buttonText={Strings.actions.undo}/>
          }
          clearComponent={
            <ButtonView buttonText={Strings.actions.clear}/>
          }
          eraseComponent={
            <ButtonView buttonText={Strings.actions.eraser}/>
          }
          strokeComponent={(color) => (
            <View
              style={[{ backgroundColor: color }, styles.strokeColorButton]}
            />
          )}
          onClosePressed={backAction}
          strokeSelectedComponent={(color, index, changed) => {
            return (
              <View
                style={[
                  { backgroundColor: color, borderWidth: 2 },
                  styles.strokeColorButton,
                ]}
              />
            );
          }}
          strokeWidthComponent={(w) => {
            return (
              <View style={styles.strokeWidthButton}>
                <View
                  style={{
                    backgroundColor: Colors.white,
                    marginHorizontal: 2.5,
                    width: Math.sqrt(w / 3) * 10,
                    height: Math.sqrt(w / 3) * 10,
                    borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                  }}
                />
              </View>
            );
          }}
          saveComponent={
            <ButtonView buttonText={Strings.actions.save}/>
          }
          savePreference={() => {
            return {
              folder: "DrawApp_Images",
              filename: String(Math.ceil(Math.random() * 100000000)),
              transparent: false,
              imageType: "png",
            };
          }}
          onSketchSaved={(result: boolean, path: string) =>
            showToast(`Your image saved on the below path \n ${path}`)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.halfWhite,
  },
  subContainer: { backgroundColor: "transparent", flex: 1 },
  rowContainer: { flex: 1, flexDirection: "row" },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },

});
export default App;
