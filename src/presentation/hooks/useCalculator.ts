import {useState} from 'react';

export const useCalculator = () => {
  const [number, setNumber] = useState('0');

  const buildNumber = (textNumber: string) => {
    // Do not allow double point
    if (number.includes('.') && textNumber === '.') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      if (textNumber === '.') {
        setNumber(number + textNumber);
      } else if (textNumber === '0' && number.includes('.')) {
        setNumber(number + textNumber);
      } else if (!number.includes('.')) {
        setNumber(textNumber);
      } else {
        setNumber(number + textNumber);
      }
    } else {
      setNumber(number + textNumber);
    }
  };

  const toggleNumberSign = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  const clear = () => {
    setNumber('0');
  };

  const deleteLast = () => {
    if (number.startsWith('0') || number.startsWith('-0')) {
      return;
    } else if (number.replace('-', '').length === 1) {
      setNumber('0');
    } else {
      setNumber(number.slice(0, number.length - 1));
    }
  };

  return {
    // properties
    number,

    // methods
    buildNumber,
    toggleNumberSign,
    clear,
    deleteLast,
  };
};
