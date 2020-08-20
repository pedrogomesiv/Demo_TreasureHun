import React, {useEffect, useRef, useReducer} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import {SCANNER} from 'utils/constant';
import {request, check, RESULTS, PERMISSIONS} from 'react-native-permissions';
import {RNCamera} from 'react-native-camera';

const Info = props => {
  const {navigation, route} = props;
  useEffect(() => {
    console.log('=====================');
    console.log(route.params?.scanData);
    console.log('=====================');
  }, [route.params?.scanData]);

  const scanQr = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate(SCANNER);
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('DENIED');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('never ask again ');
        }
      } catch (e) {}
    } else if (Platform.OS === 'ios') {
      // What will be here
      request(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              return alert('Unable To Access Camera');
            case RESULTS.DENIED:
              return alert('Permission Denied ');
            case RESULTS.GRANTED:
              // return console.log('The permission is granted');
              return navigation.navigate(SCANNER);
            case RESULTS.BLOCKED:
              return alert(
                'Permission Denied Please go \nSetting > App > Allow Camera',
              );
          }
        })
        .catch(error => {
          // …
          console.log('Error State');
          console.log(error);
        });
    }
  };

  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(colors.themeColor);
  }, ['']);

  return (
    <ImageBackground
      source={images.homeBack}
      style={{
        width: '100%',
        // height: '105%',
        flex: 1,
        backgroundColor: colors.themeColor,
        // marginBottom: sizes.getHeight(50),
      }}>
      <Block center>
        <Block style={styles.homeHeaderCon}>
          <Image source={icons.appNameLogo} style={styles.homeHeaderImg} />
        </Block>
        {/* --------------------- */}
        <Block style={styles.qrImgCon}>
          <Image source={icons.qr} style={styles.qrImg} />
        </Block>
        {/* --------------------- */}
        <Block style={styles.titleCon}>
          <Image source={icons.iWinYourPrize} style={styles.titleImg} />
        </Block>
        {/* --------------------- */}
        <Block style={styles.scanCon}>
          <Button
            onPress={scanQr}
            middle
            center
            style={{
              // borderWidth: 1,
              height: sizes.getHeight(6),
              width: sizes.getWidth(40),
            }}>
            <Image source={icons.scanBtn} style={styles.scanImg} />
          </Button>
        </Block>
        {/* --------------------- */}
        {/* <Block style={styles.homeBackCon}>
        <Image source={images.homeBack} style={styles.homeBack} />
      </Block> */}
        {/* --------------------- */}
      </Block>
    </ImageBackground>
  );
};

export default Info;

const styles = StyleSheet.create({
  homeBackCon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
  homeHeaderCon: {
    flex: 0,
    height: sizes.getHeight(10),
    marginBottom: sizes.getHeight(5),
    // marginTop: sizes.getHeight(7),
    // borderWidth: 1,
  },
  homeHeaderImg: {
    resizeMode: 'contain',
    flex: 1,
  },
  homeBack: {
    resizeMode: 'contain',
    height: sizes.getHeight('103%'),
    // zIndex: -10,
  },
  qrImgCon: {
    marginTop: sizes.getHeight(3),
    flex: 0,
    height: sizes.getHeight(25),
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  qrImg: {
    resizeMode: 'contain',
    height: sizes.getHeight('100%'),
    width: sizes.getWidth('90%'),
    tintColor: colors.primary,
  },
  titleCon: {
    height: sizes.getHeight(10),
    flex: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    resizeMode: 'contain',
    // flex: 0.5,
    height: sizes.getHeight(10),
    width: sizes.getWidth(50),
  },
  scanCon: {
    flex: 0,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes.getHeight(10),
    width: '100%',
    padding: 0,
  },
  scanImg: {
    resizeMode: 'contain',
    flex: 1,
  },
});
