import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  font_family,
  H,
  W,
  font_size,
  colors,
} from '../constants/constant_styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TextInputComp from '../components/TextInputComp';
import Margin from '../components/Margin';
import GreenButton from '../components/GreenButton';

const Profile_screen = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const log_out = () => {
    dispatch({type: 'auth/logout'});
  };
  return (
    <View style={styles.container}>
      <Margin style={{marginTop: '30%'}} />
      <Icon
        name="account-circle"
        size={100}
        color={colors.dark_green}
        style={{alignSelf: 'center'}}
      />
      <Margin style={{marginTop: '5%'}} />
      <View style={styles.profileData}>
        <TextInputComp value={user.Username} editable={false} />
        <Margin style={{marginTop: '3%'}} />
        <TextInputComp value={user.Email} editable={false} />
        <Margin style={{marginTop: '3%'}} />
        <TextInputComp value={user.PhoneNumber} editable={false} />
      </View>
      <View style={{position: 'absolute', bottom: '4%', alignSelf: 'center'}}>
        <GreenButton
          onPress={() => log_out()}
          text="Logout"
          button_style={styles.button_style}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  button_style: {
    width: W - 50,
    height: 50,
    backgroundColor: colors.dark_green,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  profileData: {
    padding: 25,
  },
  logout_button: {
    alignSelf: 'flex-end',
    right: '10%',
    top: '5%',
  },
  logout_text: {
    fontFamily: font_family.SemiBold,
    color: colors.dark_green,
    fontSize: font_size.mid,
  },
});

export default Profile_screen;
