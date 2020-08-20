import React, {useEffect, useRef, useReducer} from 'react';
import {StyleSheet, FlatList, Image, ScrollView, Platform} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import {HOME, QR, LOCATION, INFO} from 'utils/constant';

const HomeCard = props => {
  const {navigation, item, moveTo} = props;
  return (
    <Button onPress={() => moveTo(item)} style={styles.homeCardCon}>
      <Block middle center style={styles.cardImg}>
        <Text color="#f9f9f999" style={{fontSize: sizes.header}}>
          £:{item.amount}
        </Text>
      </Block>
      <Block style={styles.detailsCon}>
        <Text h1 color={colors.primary}>
          {item.name}
        </Text>
        <Text h2 color={colors.primary}>
          {item.description}
        </Text>
      </Block>
    </Button>
  );
};

export {HomeCard};

const styles = StyleSheet.create({
  homeCardCon: {
    flexDirection: 'row',
    flex: 0,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: sizes.getWidth(3),
    height:
      Platform.OS === 'android' ? sizes.getHeight(13) : sizes.getHeight(10.9),
    // width: sizes.getWidth('100%'),
    marginVertical: sizes.getHeight(1),
    paddingHorizontal: sizes.getWidth(1),
    paddingRight: sizes.getWidth(2),
    alignItems: 'center',
  },
  detailsCon: {
    flex: 0,
    width: sizes.getWidth(72),
    height: '100%',
    padding: sizes.getWidth(1),
    // borderWidth: 1,
  },
  cardImg: {
    flex: 0,
    width: sizes.getWidth(20),
    height: '90%',
    // borderWidth: 1,
    backgroundColor: '#D6CC00',
    borderRadius: sizes.getWidth(3),
  },
});
