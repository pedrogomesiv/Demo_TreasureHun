import React, {useEffect, useRef, useReducer} from 'react';
import {StyleSheet, FlatList, Image, ScrollView} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';

const Home = props => {
  const {navigation, route} = props;
  return (
    <Block middle center>
      <Text>Home</Text>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({});
