import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Regex} from '../constants/regex';
import {
  font_family,
  H,
  W,
  font_size,
  colors,
} from '../constants/constant_styles';

// Custom component
import TextInputComp from '../components/TextInputComp';
import PasswordCompt from '../components/PasswordInputComp';
import GreenButton from '../components/GreenButton';
import Margin from '../components/Margin';
import ErrorMessage from '../components/ErrorMessage';
const Signup_screen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // To set keyboard view
  useEffect(() => {
    const show_keyboard = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hide_keyboard = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });
    // cleanup function
    return () => {
      show_keyboard.remove();
      hide_keyboard.remove();
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus('Keyboard Shown');
  const _keyboardDidHide = () => setKeyboardStatus('Keyboard Hidden');

  const [Username, set_Username] = useState('');
  const [Email, set_Email] = useState('');
  const [Password, set_Password] = useState('');
  const [ConfirmPassword, set_Confirmpassword] = useState('');
  const [PhoneNumber, set_Phonenumber] = useState('');

  const [Validemail, set_Validemail] = useState(false);
  const [Validphone, set_Validphone] = useState(false);
  const [Validpassword, set_Validpass] = useState(false);
  const [Validconfirmpass, set_Validconfirmpass] = useState(false);

  // Validating Email
  const check_mail = value => {
    const mail_test = new RegExp(Regex.email);
    if (mail_test.test(value)) {
      set_Validemail(true);
    }
    set_Email(value);
  };

  // Validating Phonenumber
  const check_phone = value => {
    const phone_test = new RegExp(Regex.phoen);
    if (phone_test.test(value)) {
      set_Validphone(true);
    }
    set_Phonenumber(value);
  };

  // Validating Password
  const check_password = value => {
    const pass_test = new RegExp(Regex.password);
    if (pass_test.test(value)) {
      set_Validpass(true);
    }
    set_Password(value);
  };

  // Validating Confirm Password
  const check_confirmpass = value => {
    if (Password === value) {
      set_Validconfirmpass(true);
    }
    set_Confirmpassword(value);
  };

  // Sign Up function

  const sign_up = () => {
    if (
      Validemail &&
      Validpassword &&
      Validphone &&
      Validconfirmpass &&
      Username.length > 0
    ) {
      const data = {
        Username: Username,
        PhoneNumber: PhoneNumber,
        Email: Email,
        Password: Password,
      };

      dispatch({
        type: 'user/data',
        Email: data.Email,
        PhoneNumber: data.PhoneNumber,
        Password: Password,
        registration_date: new Date(),
        Username: data.Username,
      });
      dispatch({
        type: 'auth/signin',
        signupTime: new Date(),
      });
    } else {
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView behavior="padding">
        <View style={styles.headerView}>
          <Text style={styles.bold_text}>Register</Text>
          <Text style={styles.normal_text}>Create your account</Text>
        </View>
        <View style={styles.detailsView}>
          <TextInputComp
            placeholder_text="Username"
            onChangeText={value => set_Username(value)}
          />
          <Margin style={{marginTop: '2%'}} />
          <TextInputComp
            placeholder_text="Email"
            onChangeText={value => check_mail(value)}
          />

          {Validemail === false && Email.length > 0 ? (
            <>
              <ErrorMessage text="Email is not in proper format" />
            </>
          ) : null}
          <Margin style={{marginTop: '2%'}} />
          <PasswordCompt
            placeholder_text="Password"
            onChangeText={value => check_password(value)}
          />

          {Validpassword === false && Password.length > 0 ? (
            <>
              <ErrorMessage text="Password should have 1-small leter, 1-cap letter 1-number 1-special char" />
            </>
          ) : null}
          <Margin style={{marginTop: '2%'}} />
          <PasswordCompt
            placeholder_text="Confirm password"
            onChangeText={value => check_confirmpass(value)}
          />
          {Validconfirmpass === false && ConfirmPassword.length > 0 ? (
            <>
              <ErrorMessage text="Password didn't match" />
            </>
          ) : null}
          <Margin style={{marginTop: '2%'}} />
          <TextInputComp
            placeholder_text="Phone number"
            onChangeText={value => check_phone(value)}
          />
          {Validphone === false && PhoneNumber.length > 0 ? (
            <>
              <ErrorMessage text="Phone number is not correct" />
            </>
          ) : null}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: keyboardStatus === 'Keyboard Shown' ? -100 : '4%',
          alignSelf: 'center',
        }}>
        <GreenButton
          text="Sign Up"
          button_style={styles.buttonStyle}
          onPress={() => sign_up()}
        />
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Alraedy have an accout? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  buttonStyle: {
    width: W - 50,
    height: '80%',
    backgroundColor: colors.dark_green,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  image: {
    height: H / 3.5,
    width: W,
  },
  detailsView: {alignSelf: 'center', marginTop: 50},
  loginText: {
    fontFamily: font_family.SemiBold,
    fontSize: font_size.tiny,
    color: colors.dark_green,
    opacity: 0.8,
  },
  row_view: {
    flexDirection: 'row',
  },
  headerView: {
    marginTop: '20%',
    alignSelf: 'center',
    right: 30,
  },
  bold_text: {
    fontFamily: font_family.SemiBold,
    color: colors.dark_green,
    fontSize: font_size.h2,
    alignSelf: 'center',
  },
  normal_text: {
    fontFamily: font_family.SemiBold,
    color: colors.grey,
    fontSize: font_size.regular,
    bottom: '5%',
    alignSelf: 'center',
    opacity: 0.75,
  },
  bottomText: {
    fontFamily: font_family.SemiBold,
    fontSize: font_size.tiny,
    color: colors.grey,
    opacity: 0.8,
  },
  bottomView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '2%',
  },
});

export default Signup_screen;
