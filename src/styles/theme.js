import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PixelRatio} from 'react-native';

const scaleFont = size => size * PixelRatio.getFontScale();

const colors = {
  primary: '#FFFFFF',
  secondary: '#F5138E',
  black: '#000000',
  gray: '#979797',
  gray2: '#707070',
  gray5: '#505050',
  gray3: '#2C262B',
  gray4: '#1A1A1A',
  black2: '#120810',
  themeColor: 'rgb(0, 89, 129)',
};
const screenSize = wp('100%') + hp('100%');
const getDimensions = {
  width: wp('100%'),
  height: hp('100%'),
};

const sizes = {
  // global sizes
  base: Math.floor(screenSize * 0.0125), //16
  border: Math.floor(screenSize * 0.008), //10
  padding: Math.floor(screenSize * 0.011), //14
  borderRaduis: screenSize * 0.015,

  getWidth: width => wp(width),
  getHeight: height => hp(height),

  withWidth: size => getDimensions.width * size,
  withHeight: size => getDimensions.height * size,
  withScreen: size => screenSize * size,
  getDimensions: {
    width: wp('100%'),
    height: hp('100%'),
  },
  getDimensions,
  screenSize,
  // font sizes
  font: scaleFont(18), //18
  h1: scaleFont(20), //20
  h2: scaleFont(16), //16
  h3: scaleFont(14), //14
  h4: scaleFont(12), //12
  title: scaleFont(24), //24
  title2: scaleFont(22), //22
  header: scaleFont(26), //26
  customFont: size => scaleFont(size),
};

const fonts = {
  default: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.font,
  },
  h1: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.h1,
  },
  h2: {
    //fontFamily: 'Rubik-Medium',
    fontSize: sizes.h2,
  },
  h3: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.h3,
  },
  h4: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.h4,
  },
  header: {
    //fontFamily: 'Rubik-Bold',
    fontSize: sizes.header,
  },
  title: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.title,
  },
  title2: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.title2,
  },
  header: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.header,
  },
};
function handleMargins(margin) {
  if (typeof margin === 'number') {
    return {
      marginTop: margin,
      marginRight: margin,
      marginBottom: margin,
      marginLeft: margin,
    };
  }

  if (typeof margin === 'object') {
    const marginSize = Object.keys(margin).length;
    switch (marginSize) {
      case 1:
        return {
          marginTop: margin[0],
          marginRight: margin[0],
          marginBottom: margin[0],
          marginLeft: margin[0],
        };
      case 2:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[0],
          marginLeft: margin[1],
        };
      case 3:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[1],
        };
      default:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[3],
        };
    }
  }
}

function handlePaddings(padding) {
  if (typeof padding === 'number') {
    return {
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
    };
  }

  if (typeof padding === 'object') {
    const paddingSize = Object.keys(padding).length;
    switch (paddingSize) {
      case 1:
        return {
          paddingTop: padding[0],
          paddingRight: padding[0],
          paddingBottom: padding[0],
          paddingLeft: padding[0],
        };
      case 2:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[0],
          paddingLeft: padding[1],
        };
      case 3:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[1],
        };
      default:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[3],
        };
    }
  }
}
export {colors, sizes, fonts, handleMargins, handlePaddings};
