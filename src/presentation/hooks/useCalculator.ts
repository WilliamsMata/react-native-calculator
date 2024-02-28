import {useRef, useState} from 'react';

enum Operator {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

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

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }

    setNumber('0');
  };

  const processOperation = (
    operator: 'add' | 'subtract' | 'multiply' | 'divide',
  ) => {
    setLastNumber();
    lastOperation.current = Operator[operator];
  };

  const calculateResult = () => {
    const numb1 = Number(number);
    const numb2 = Number(prevNumber);

    if (isNaN(numb1) || isNaN(numb2)) {
      return;
    }

    switch (lastOperation.current) {
      case Operator.add:
        setNumber(`${numb1 + numb2}`);
        break;
      case Operator.subtract:
        setNumber(`${numb2 - numb1}`);
        break;
      case Operator.multiply:
        setNumber(`${numb1 * numb2}`);
        break;
      case Operator.divide:
        setNumber(`${numb2 / numb1}`);
        break;
    }

    setPrevNumber('0');
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
    setPrevNumber('0');
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
    prevNumber,

    // methods
    buildNumber,
    toggleNumberSign,
    processOperation,
    calculateResult,
    clear,
    deleteLast,
  };
};
