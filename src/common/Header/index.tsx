import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'
import { Colors, Images } from '../res';
import { isIos } from '../utils/utils';
import { deviceWidth, moderateScale } from '../utils/ScreenRatio';
interface HeaderProps {
    headerText: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
}

const Header = ({headerText, showBackButton, onBackPress}: HeaderProps) => {  
  return (
    <View style={styles.container}>
      {showBackButton ? <TouchableOpacity  onPress={() => onBackPress()} style={styles.backButtonStyle}>
        <Image style={styles.backButton} source={Images.LeftArrow} />
      </TouchableOpacity> : null}
      <Text style={styles.headerText}>
        {headerText}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(24),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    textAlign: 'center',
    width: deviceWidth,
    color: Colors.white,
    fontSize: 20,

  },
  backButtonStyle: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  backButton: {
    width: 30,
    height: 30,
  }
});

export default Header;