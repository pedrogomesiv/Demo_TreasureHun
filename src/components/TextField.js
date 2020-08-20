import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Block} from 'components';
import {theme} from 'styles';
import {Image} from 'react-native';

const TextField = props => {
  const {placeholder, icon, name, onChangeText, value} = props;
  return (
    <Block
      color={theme.colors.gray4}
      flex={false}
      center
      row
      padding={[0, theme.sizes.padding, 0, theme.sizes.padding]}
      style={styles.container}>
      <Image source={icon} style={{marginHorizontal: theme.sizes.border}} />
      <TextInput
        {...props}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray5}
        style={styles.textInput}
        onChangeText={text => onChangeText({name, text})}
        value={value}
      />
    </Block>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    height: theme.sizes.withHeight(0.09),
    width: '100%',
    borderRadius: theme.sizes.border,
    marginVertical: theme.sizes.padding,
  },
  textInput: {
    color: theme.colors.gray5,
    width: '100%',
    ...theme.fonts.h1,
  },
});
