/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Packages
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

// Stacks
import MainStack from './routes/main_stack';
import LoginStack from './routes/login_stack';
import Profile_screen from './screens/profile_screen';
import {colors} from './constants/constant_styles';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Tab1"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          shadowOpacity: 0.5,
          elevation: 5,
          shadowColor: '#000',
          height: 50,
        },
      }}>
      <Tab.Screen
        name="Tab1"
        component={MainStack}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="home"
                size={24}
                color={focused ? colors.dark_green : colors.black}
                style={focused ? null : {opacity: 0.25}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Tab2"
        component={Profile_screen}
        options={{
          title: 'profile',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="person"
                size={24}
                color={focused ? colors.dark_green : colors.black}
                style={focused ? null : {opacity: 0.25}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const RootComponent = () => {
  const auth = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      {auth.isSignedUp || auth.isLoggedIn ? <BottomTabs /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default RootComponent;
