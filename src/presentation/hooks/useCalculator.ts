import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = '×',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');

  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

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
    const result = calculateSubResult();
    setFormula(result.toString());
    lastOperation.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValue] = formula.split(' ');

    const numb1 = Number(firstValue);
    const numb2 = Number(secondValue);

    if (isNaN(numb2)) {
      return numb1;
    }

    switch (operation) {
      case Operator.add:
        return numb1 + numb2;

      case Operator.subtract:
        return numb1 - numb2;

      case Operator.multiply:
        return numb1 * numb2;

      case Operator.divide:
        return numb1 / numb2;

      default:
        return 0;
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
    setPrevNumber('0');
    setFormula('');
    lastOperation.current = undefined;
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
    formula,
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
