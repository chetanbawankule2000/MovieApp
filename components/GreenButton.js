import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  colors,
  font_family,
  font_size,
  W,
  H,
} from '../constants/constant_styles';

const GreenButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.05}
      style={props.button_style}
      onPress={props.onPress}>
      <Text
        style={{
          fontFamily: font_family.Regular,
          color: colors.white,
          alignSelf: 'center',
          fontSize: font_size.small,
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button_style: {},
});
export default GreenButton;
