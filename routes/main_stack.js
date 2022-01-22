import React from 'react';

// ---- PACKAGES ----
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ---- SCREENS ----
import Home_screen from '../screens/home_screen';
import Detail_screen from '../screens/detail_screen';
const MainStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Stack.Screen
        name="Home"
        component={Home_screen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail_screen}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
