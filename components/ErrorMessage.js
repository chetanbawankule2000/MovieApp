import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  font_family,
  H,
  W,
  font_size,
  colors,
} from '../constants/constant_styles';
const ErrorMessage = props => {
  return <Text style={styles.message_style}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  message_style: {
    color: colors.error_coloer,
    fontFamily: font_family.Regular,
    fontSize: font_size.tiny,
  },
});
export default ErrorMessage;
