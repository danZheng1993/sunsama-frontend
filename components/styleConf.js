import { Platform } from 'react-native';

export const backgroundColor = '#E5E5E5';
export const foregroundColor = '#FFFFFF';
export const primaryTextColor = '#333333';
export const secondaryTextColor = '#787878';
export const buttonTextColor = '#818181';
export const deactiveColor = '#B4B4B4B4';
export const activeColor = '#4DCD7D';
export const positiveColor = '#2CA7FF';
export const negativeColor = '#FB4A4A';

export const shadowProps = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  android: {
    elevation: 1,
  }
});