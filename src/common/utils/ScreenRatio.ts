'use strict';
import { Dimensions } from 'react-native';

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = (width: any, height: any) => width < height ? 350 : 500;
const guidelineBaseHeight = (width: any, height: any) => width < height ? 680 : 350;

// scale - for horizontal..
const scale = (size: number) => {
  const { width, height } = Dimensions.get('window');
  return (width / guidelineBaseWidth(width, height)) * size;
}

// vericalscale - for vertical..
const verticalScale = (size: number) => {
  const { width, height } = Dimensions.get('window');
  return (height / guidelineBaseHeight(width, height)) * size;
}

// moderatescale - for margin..
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const deviceWidth = Dimensions.get('window').width;

const deviceHeight = Dimensions.get('window').height;
const isPortrait = deviceWidth < deviceHeight ? true : false;

export { scale, verticalScale, moderateScale, deviceWidth, deviceHeight, isPortrait };
