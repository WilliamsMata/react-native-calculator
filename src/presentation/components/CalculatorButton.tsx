import React from 'react';
import {Pressable, Text} from 'react-native';
import {globalStyles} from '../../config/theme/app-theme';

interface CalculatorButtonProps {
  label: string;
  color?: string;
  dobleSize?: boolean;
  blackText?: boolean;

  onPress: () => void;
}

export function CalculatorButton({
  label,
  color,
  dobleSize = false,
  blackText = false,
  onPress,
}: CalculatorButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        ...globalStyles.button,
        backgroundColor: color || globalStyles.button.backgroundColor,
        opacity: pressed ? 0.8 : 1,
        width: dobleSize
          ? globalStyles.button.width * 2 + 10
          : globalStyles.button.width,
      })}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...globalStyles.buttonText,
          color: blackText ? 'black' : globalStyles.buttonText.color,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
