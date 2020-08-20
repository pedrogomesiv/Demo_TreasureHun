import React from 'react';
import Navigations from 'navigations';
import {enableScreens} from 'react-native-screens';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {colors} from 'styles/theme';

const App = () => {
  enableScreens();
  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <StatusBar barStyle="light-content" />
        <Navigations />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: colors.themeColor,
  },
  bottomSafeArea: {
    flex: 1,
  },
});

export default App;
