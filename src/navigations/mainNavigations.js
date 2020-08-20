import React, {useEffect, useRef, useReducer} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Qr, Info, Location, Scanner} from 'screens';
import {Image, StyleSheet, PermissionsAndroid} from 'react-native';
import * as icons from 'assets/icons';
import {sizes, colors} from 'styles/theme';
import {HOME, QR, LOCATION, INFO, BOTTOMSTACK, SCANNER} from 'utils/constant';

const BottomStack = createBottomTabNavigator();
const TabStack = () => {
  return (
    <BottomStack.Navigator
      headerMode="none"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.themeColor,
          elevation: 0,
          borderTopColor: 'transparent',
        },
      }}>
      <BottomStack.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.home}
              style={{
                ...styles.icons,
                height: focused ? sizes.getWidth(18) : sizes.getWidth(13),
              }}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name={QR}
        component={Qr}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.qr}
              style={{
                ...styles.icons,
                height: focused ? sizes.getWidth(18) : sizes.getWidth(13),
              }}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name={INFO}
        component={Info}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.info}
              style={{
                ...styles.icons,
                height: focused ? sizes.getWidth(18) : sizes.getWidth(13),
              }}
            />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const Stack = createStackNavigator();
export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={BOTTOMSTACK} component={TabStack} />
        <Stack.Screen name={LOCATION} component={Location} />
        <Stack.Screen name={SCANNER} component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icons: {
    resizeMode: 'contain',
    // width: sizes.getWidth(13),
    height: sizes.getWidth(13),
    tintColor: colors.primary,
  },
});
