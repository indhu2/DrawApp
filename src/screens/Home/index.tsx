import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, BackHandler, Alert, AppState, SafeAreaView } from "react-native";
import RNSketchCanvas from "@terrylinla/react-native-sketch-canvas";
import { isIos, showToast } from "../../common/utils/utils";
import { Colors, Strings } from "../../common/res";
import ButtonView from "../../common/components/Button";
import { openSettings } from "react-native-permissions";
import {
  getPermission,
  Permission,
  PERMISSION_TYPE,
} from "../../common/utils/AppPermissions";
import CustomAlert from "../../common/components/CustomAlert";
import { deviceWidth, moderateScale } from "../../common/utils/ScreenRatio";
import ViewSavedFiles from "../../common/components/ViewSavedFiles";
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from "../../redux/store";
import { setStoredFiles } from "../../redux/reducers/home";

const Home = () => {
  const [hasPermission, setPermission] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showFilesView, setShowFilesView] = useState(false);

  const [currentFile, setCurrentFile] = useState({});
  const appStateRef = useRef(AppState.currentState);

  const dispatch = useDispatch();

  const {storedFiles} = useSelector((state: RootState) => state.home);  

  const handleAppStateChange = useCallback((nextAppState) => {
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      requestStorageAccess();
      // callback(nextAppState);
    }

    appStateRef.current = nextAppState;
  }, []);

  console.log("showFilesView--- ", showFilesView);
  

  // const backAction = () => {
  //   if (showFilesView) {
  //     setShowFilesView(false);
  //   } else {
  //     BackHandler.exitApp();
  //   }
  //   return true;
  // };

  function backAction() {


      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false })

    return true;

  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
     backAction
    );
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      backHandler?.remove()
      subscription?.remove();
    }
  }, []);

  const requestStorageAccess = useCallback(async () => {
    Permission.checkPermission(PERMISSION_TYPE.photo);
    let isPermission = await getPermission(PERMISSION_TYPE.photo);
    setPermission(isPermission);
    setShowAlertModal(!isPermission);
  }, []);

  const onSaveFile = () => {
    let saveFile = {
      folder: "DrawApp_Images",
      filename: String(Math.ceil(Math.random() * 100000000)),
      transparent: false,
      imageType: "png",
    }
    setCurrentFile(saveFile)
    return saveFile;
  };
  
  const onSavedFilePress = (result: any, path: string) => {
    let data = {...currentFile, id: storedFiles?.length + 1, path: path}
    let storeData = [];
    storeData?.push(data)
    dispatch(setStoredFiles([...storedFiles,...storeData]))
    
    showToast(`Your image saved on the below path \n ${path}`)
  }

  if(showFilesView) {
    return <ViewSavedFiles onGoBackPress={(status) => setShowFilesView(false)}/>
  }

  return (
    <View style={styles.container}>
      <SafeAreaView/>
      <View style={styles.rowContainer}>
        <RNSketchCanvas
          containerStyle={styles.subContainer}
          canvasStyle={styles.subContainer}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          closeComponent={<ButtonView buttonText={Strings.actions.close} />}
          undoComponent={<ButtonView buttonText={Strings.actions.undo} />}
          clearComponent={<ButtonView buttonText={Strings.actions.clear} />}
          eraseComponent={<ButtonView buttonText={Strings.actions.eraser} />}
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
          saveComponent={<ButtonView buttonText={Strings.actions.save} />}
          permissionDialogTitle={Strings.storage_title}
          permissionDialogMessage={Strings.storage_msg}
          savePreference={() => onSaveFile()}
          onSketchSaved={(result: boolean, path: string) => {
            onSavedFilePress(result, path)
          }
            
          }
        />
      </View>
      <ButtonView
        isPressable={true}
        onButtonPress={() => setShowFilesView(true)}
        buttonText={Strings.view_saved_files}
        style={styles.viewButton}
        textStyle={styles.viewText}
      />
      <CustomAlert
        modalVisible={showAlertModal}
        setModalVisible={(isClose: boolean) => setShowAlertModal(isClose)}
        title={"Allow DrawApp to access files on your device"}
        message={"Allow access to your Storage Permissions"}
        buttons={[
          {
            text: "Ok",
          },
          {
            text: "Open Settings",
            func: () => {
              setShowAlertModal(false);
              openSettings();
            },
          },
        ]}
      />
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
  viewButton: {
    width: deviceWidth-40,
    height: 40,
    margin: moderateScale(8),
    marginBottom: moderateScale(isIos? 16 : 4)
  },
  viewText: {
    fontSize: 14
  }
});
export default Home;
