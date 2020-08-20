import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from 'styles';

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      row,
      column,
      baseline,
      space,
      wrap,
      locations,
      shadow,
      children,
      crossLeft,
      crossRight,
      crossTop,
      crossBottom,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      disable,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      crossLeft && styles.crossLeft,
      crossRight && styles.crossRight,
      crossTop && styles.crossTop,
      crossBottom && styles.crossBottom,
      baseline && styles.baseline,
      space && {justifyContent: `space-${space}`},
      wrap && {flexWrap: 'wrap'},
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          disabled={disable}
          activeOpacity={opacity}
          {...props}>
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}>
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        disabled={disable}
        activeOpacity={opacity || 0.8}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    marginVertical: theme.sizes.padding / 3,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  crossLeft: {
    alignItems: 'flex-start',
  },
  crossRight: {
    alignItems: 'flex-end',
  },
  crossTop: {
    alignItems: 'flex-start',
  },
  crossBottom: {
    alignItems: 'flex-end',
  },
  baseline: {
    alignItems: 'baseline',
  },

  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: {backgroundColor: theme.colors.accent},
  primary: {backgroundColor: theme.colors.primary},
  secondary: {backgroundColor: theme.colors.secondary},
  tertiary: {backgroundColor: theme.colors.tertiary},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  gray: {backgroundColor: theme.colors.gray},
  gray2: {backgroundColor: theme.colors.gray2},
  gray3: {backgroundColor: theme.colors.gray3},
  gray4: {backgroundColor: theme.colors.gray4},
});
