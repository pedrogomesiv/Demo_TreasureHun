import React, {useEffect, useRef, useReducer} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {QR} from 'utils/constant';

const Scanner = props => {
  const {navigation, route} = props;

  const onScan = e => {
    console.log('ON Scan', e.data);

    Linking.canOpenURL(e.data).then(canopen => {
      if (!canopen) return console.log(canopen);
    });
    console.log('Opening in browser');
    Linking.openURL(e.data)
      .then(navigation.navigate(QR))
      .catch(err => console.error('An error occurred', err));
    // Linking.canOpenURL()
    // navigation.navigate(QR, {
    //   scanData: e.data,
    // });
  };

  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(colors.themeColor);
  }, ['']);
  // =====================================================

  // =====================================================
  return (
    <Block middle center>
      <Block style={styles.homeBackCon}>
        <Image source={images.homeBackDim} style={styles.homeBack} />
      </Block>
      {/* ------------------------------------------------------- */}
      <QRCodeScanner
        onRead={onScan}
        showMarker={true}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        // topContent={{}}
        // bottomContent={
        //   <Button>
        //     <Text style={styles.buttonText}>Scan</Text>
        //   </Button>
        // }
      />
    </Block>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  homeBackCon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    // zIndex: -10,
  },
  homeBack: {
    resizeMode: 'contain',
    height: sizes.getHeight('103%'),
  },
});
