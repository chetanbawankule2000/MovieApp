import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
  colors,
  font_family,
  font_size,
  W,
  H,
} from '../constants/constant_styles';

const PasswordCompt = props => {
  return (
    <TextInput
      secureTextEntry={true}
      style={styles.text_input}
      placeholder={props.placeholder_text}
      placeholderTextColor={colors.black}
      onChangeText={props.onChangeText}></TextInput>
  );
};
const styles = StyleSheet.create({
  text_input: {
    backgroundColor: colors.bright,
    fontFamily: font_family.Medium,
    width: W - 50,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: font_size.tiny,
    alignSelf: 'center',
    marginVertical: 5,
    color: colors.black,
  },
});
export default PasswordCompt;
