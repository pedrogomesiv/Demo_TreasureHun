import React, {useEffect, useRef, useReducer} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import {claimDetails} from 'utils';

const Info = props => {
  const {navigation, route} = props;
  return (
    <ImageBackground
      source={images.msgBack}
      style={{
        width: '100%',
        // height: '105%',
        flex: 1,
        backgroundColor: colors.themeColor,
        // marginBottom: sizes.getHeight(50),
      }}>
      <Block middle center>
        {/* <Block style={styles.homeBackCon}>
        <Image source={images.msgBack} style={styles.homeBack} />
      </Block> */}
        {/* ------------------- */}
        <Block style={styles.homeHeaderCon}>
          <Image source={icons.claimMessageLogo} style={styles.homeHeaderImg} />
        </Block>
        {/* ------------------- */}
        <FlatList
          data={claimDetails}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item, index}) => {
            return (
              <Block style={styles.listCon}>
                <Image source={item.numberImage} style={styles.numberImg} />
                <Text style={{flex:1}} color={colors.primary}>{item.title}</Text>
              </Block>
            );
          }}
        />
        <Image style={{ width: 180, height: 180 }} source={require('./circle-cropped.png')} />
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
  },
  homeHeaderCon: {
    flex: 0,
    height: sizes.getHeight(10),
    marginBottom: sizes.getHeight(5),
    // borderWidth: 1,
  },
  homeBack: {
    resizeMode: 'contain',
    height: sizes.getHeight('103%'),
  },
  homeHeaderImg: {
    resizeMode: 'contain',
    flex: 1,
  },
  listCon: {
    // borderWidth: 1,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0,
    height: sizes.getHeight(7),
    width: sizes.getWidth('90%'),
    alignItems: 'center',
    marginVertical: sizes.getHeight(0.8),
  },
  numberImg: {
    resizeMode: 'contain',
    width: sizes.getWidth(10),
    height: sizes.getHeight(10),
  },
});
