import {Text, View} from 'react-native';
import React from 'react';
import {colors, globalStyles} from '../../config/theme/app-theme';
import {CalculatorButton} from '../components/CalculatorButton';
import {useCalculator} from '../hooks/useCalculator';

export function CalculatorScreen() {
  const {
    formula,
    // number,
    prevNumber,
    buildNumber,
    toggleNumberSign,
    processOperation,
    calculateResult,
    clear,
    deleteLast,
  } = useCalculator();

  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={globalStyles.resultContainer}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={globalStyles.mainResult}>
          {formula === '' ? '0' : formula}
        </Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={globalStyles.subResult}>
          {prevNumber === '0' ? '' : prevNumber}
        </Text>
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          onPress={() => clear()}
          blackText
          label="C"
          color={colors.lightGray}
        />
        <CalculatorButton
          onPress={() => toggleNumberSign()}
          blackText
          label="+/-"
          color={colors.lightGray}
        />
        <CalculatorButton
          onPress={() => deleteLast()}
          blackText
          label="del"
          color={colors.lightGray}
        />
        <CalculatorButton
          onPress={() => processOperation('divide')}
          label="÷"
          color={colors.orange}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton onPress={() => buildNumber('7')} label="7" />
        <CalculatorButton onPress={() => buildNumber('8')} label="8" />
        <CalculatorButton onPress={() => buildNumber('9')} label="9" />
        <CalculatorButton
          onPress={() => processOperation('multiply')}
          label="×"
          color={colors.orange}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton onPress={() => buildNumber('4')} label="4" />
        <CalculatorButton onPress={() => buildNumber('5')} label="5" />
        <CalculatorButton onPress={() => buildNumber('6')} label="6" />
        <CalculatorButton
          onPress={() => processOperation('subtract')}
          label="-"
          color={colors.orange}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton onPress={() => buildNumber('1')} label="1" />
        <CalculatorButton onPress={() => buildNumber('2')} label="2" />
        <CalculatorButton onPress={() => buildNumber('3')} label="3" />
        <CalculatorButton
          onPress={() => processOperation('add')}
          label="+"
          color={colors.orange}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          onPress={() => buildNumber('0')}
          label="0"
          dobleSize
        />
        <CalculatorButton onPress={() => buildNumber('.')} label="." />
        <CalculatorButton
          onPress={calculateResult}
          label="="
          color={colors.orange}
        />
      </View>
    </View>
  );
}
