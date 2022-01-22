import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {
  colors,
  font_family,
  font_size,
  W,
  H,
} from '../constants/constant_styles';

const TextInputComp = props => {
  return (
    <TextInput
      style={styles.text_input}
      placeholder={props.placeholder_text}
      placeholderTextColor={colors.black}
      onChangeText={props.onChangeText}
      value={props.value}
      editable={props.editable}></TextInput>
  );
};
const styles = StyleSheet.create({
  text_input: {
    backgroundColor: colors.bright,
    fontFamily: font_family.Medium,
    width: W - 50,
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: font_size.tiny,
    alignSelf: 'center',
    marginVertical: 5,
    color: colors.black,
    textAlignVertical: 'center',
    alignSelf: 'flex-start',
  },
});
export default TextInputComp;
