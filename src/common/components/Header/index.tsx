import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { largeFontSize } from '../../res/CommonStyles';
import { Colors } from '../../res';
import { deviceWidth, moderateScale } from '../../utils/ScreenRatio';

interface HeaderProps {
    headerText: string;
    showBackButton?: boolean;
    onBackPress: () => void;
}

const Header = ({headerText, showBackButton, onBackPress}: HeaderProps) => {  
  return (
    <View style={styles.container}>
      {showBackButton ? <TouchableOpacity  onPress={() => onBackPress()} style={styles.backButtonStyle}>
        <Text>Back</Text>
      </TouchableOpacity> : null}
      <Text
        style={styles.headerText}>
        {headerText}
      </Text>
    </View>
  );
}

Header.defaultProps = {
    showBackButton: true,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: '10%',
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    textAlign: 'center',
    width: deviceWidth,
    fontSize: largeFontSize,
    color: Colors.white,
  },
  backButtonStyle: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default Header;