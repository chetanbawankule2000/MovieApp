import React from 'react';

// ---- PACKAGES ----
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

// ---- SCREENS ----
import Login_screen from '../screens/login_screen';
import Signup_screen from '../screens/signup_screen';

const LoginStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Stack.Screen
        name="Login"
        component={Login_screen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup_screen}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
