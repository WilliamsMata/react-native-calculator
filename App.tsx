import React from 'react';
import {StatusBar, View} from 'react-native';
import {CalculatorScreen} from './src/presentation/screens/CalculatorScreen';
import {globalStyles} from './src/config/theme/app-theme';

function App() {
  return (
    <View style={globalStyles.background}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />

      <CalculatorScreen />
    </View>
  );
}

export default App;
