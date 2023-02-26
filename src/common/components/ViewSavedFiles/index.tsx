import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Colors, Strings } from "../../res";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import FileViewer from "react-native-file-viewer";
import Header from "../../Header";
import { deviceHeight, moderateScale } from "../../utils/ScreenRatio";
import { isIos } from "../../utils/utils";

interface ViewSavedFilesProps {
  onGoBackPress?: (param: any) => void;
}

const ViewSavedFiles = ({ onGoBackPress }: ViewSavedFilesProps) => {
  const { storedFiles } = useSelector((state: RootState) => state.home);

  const renderFile = ({ item }: any) => {    
    return (
      <TouchableOpacity
        style={[styles.card, styles.shadow]}
        onPress={() => {
          FileViewer.open(item?.path); // absolute-path-to-my-local-file
        }}
      >
        <View style={styles.rowContainer}>
          <Image
            source={{ uri: isIos ? `${item?.path}` : `file:///${item?.path}` }}
            style={[styles.fileImage]}
          />
          <View>
            <Text>{`${Strings.fileName} : ${item?.filename}`}</Text>
            <Text>{`${Strings.image_type} : ${item?.imageType}`}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => FileViewer.open(item?.path)}>
          <Text style={styles.text}>{Strings.openFile}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header
        showBackButton={true}
        headerText={Strings.view_saved_files}
        onBackPress={() => onGoBackPress(false)}
      />
      <View style={styles.subContainer}>
        <FlatList
          data={storedFiles}
          keyExtractor={(item) => item?.id}
          renderItem={renderFile}
          ListEmptyComponent={() => (
            <View
              style={[
                styles.card,
                {
                  flex: 1,
                  height: deviceHeight / 1.2,
                  marginVertical: moderateScale(16),
                },
              ]}
            >
              <Text style={{ color: Colors.black }}>
                {Strings.noRecordsFound}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.halfWhite,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    marginVertical: moderateScale(8),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
  },
  rowContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shadow: {
    shadowColor: Colors.blackShadowBg,
    shadowOffset: { width: 0, height: moderateScale(1) },
    shadowOpacity: 1,
    shadowRadius: moderateScale(2),
    elevation: moderateScale(10),
  },
  fileImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderColor: Colors.blackShadowBg,
    borderRadius: moderateScale(4),
    borderWidth: 1,
    margin: moderateScale(8),
    marginRight: moderateScale(16),
  },
  subContainer: {
    flex: 1,
    margin: moderateScale(16),
    marginVertical: moderateScale(8),
  },
  text: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default ViewSavedFiles;
