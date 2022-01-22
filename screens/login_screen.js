import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {
  font_family,
  H,
  W,
  font_size,
  colors,
} from '../constants/constant_styles';
import TextInputComp from '../components/TextInputComp';
import PasswordCompt from '../components/PasswordInputComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GreenButton from '../components/GreenButton';
import Margin from '../components/Margin';
const Login_screen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

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

  const [name_input, set_name_input] = useState('');
  const [pass_input, set_pass_input] = useState('');

  const login = () => {
    if (user.Username === name_input && user.Password === pass_input) {
      dispatch({type: 'auth/login', loginTime: new Date()});
    } else {
      console.log('credentials are incorrect');
      Snackbar.show({
        text: 'Incorrect credentials',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView behavior="padding">
        <View style={styles.headerView}>
          <Text style={styles.bold_text}>Welcome back</Text>
          <Text style={styles.normal_text}>Login to your account</Text>
        </View>
        <Margin style={{marginTop: '15%'}} />
        <TextInputComp
          placeholder_text="Enter your name"
          onChangeText={value => set_name_input(value)}
        />
        <Margin style={{marginTop: '5%'}} />
        <PasswordCompt
          placeholder_text="Enter your password"
          onChangeText={value => set_pass_input(value)}
        />

        <View style={styles.rememberView}>
          <View style={styles.rememberViewBody}>
            <TouchableOpacity>
              <Icon
                name="check-circle"
                size={14}
                color={colors.dark_green}
                style={{alignSelf: 'center', bottom: 1}}
              />
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgerPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomView}>
        <GreenButton
          onPress={() => login()}
          text="Login"
          button_style={styles.button_style}
        />
        <View style={styles.dontHaveAccTView}>
          <Text style={styles.donHaveAccText}>Don't have an accout?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 25},
  button_style: {
    width: W - 50,
    height: '80%',
    backgroundColor: colors.dark_green,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    // position: 'absolute',
    // bottom: 100,
  },
  rememberView: {
    width: W - 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: '2%',
  },
  rememberViewBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomView: {position: 'absolute', bottom: '4%', alignSelf: 'center'},
  rememberMeText: {
    fontFamily: font_family.SemiBold,
    fontSize: font_size.tiny,
    color: 'grey',
    alignSelf: 'center',
    marginLeft: '2%',
    opacity: 0.5,
  },
  forgerPasswordText: {
    fontFamily: font_family.SemiBold,
    fontSize: font_size.tiny,
    color: colors.dark_green,
    opacity: 0.8,
  },
  dontHaveAccTView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '2%',
  },
  headerView: {
    marginTop: '20%',
    alignSelf: 'center',
  },
  image: {
    height: H / 3.5,
    width: W,
  },
  login_area: {
    height: H,
    width: W,
  },
  signUpText: {
    fontFamily: font_family.SemiBold,
    fontSize: font_size.tiny,
    color: colors.dark_green,
    opacity: 0.8,
  },
  donHaveAccText: {
    fontFamily: font_family.SemiBold,
    fontSize: font_size.tiny,
    color: colors.grey,
    opacity: 0.8,
  },
  text_views: {
    height: '10%',
    marginTop: '25%',
  },
  row_view: {
    flexDirection: 'row',
  },
  bold_text: {
    fontFamily: font_family.SemiBold,
    color: colors.dark_green,
    fontSize: font_size.h2,
  },
  normal_text: {
    fontFamily: font_family.SemiBold,
    color: colors.grey,
    fontSize: font_size.regular,
    bottom: '5%',
    alignSelf: 'center',
    opacity: 0.75,
  },
});

export default Login_screen;
