import {StyleSheet} from 'react-native';
import {deviceWidth, moderateScale} from '../utils/ScreenRatio';
import {isIos} from '../utils/utils';
import Colors from './Colors';

export const miniFontSize = moderateScale(12);
export const smallFontSize = moderateScale(14);
export const midFontSize = moderateScale(15);
export const mediumFontSize = moderateScale(16);
export const largeFontSize = moderateScale(18);
export const extraLargeFontSize = moderateScale(22);

const CommonStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.blackShadowBg,
  },
});

export default CommonStyles;
