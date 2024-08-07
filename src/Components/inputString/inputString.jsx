import React, { useEffect, useState } from 'react';
import '../inputNumber/inputNumber.css';
import { useCalculator } from '../CalculatorContext.js';

const InputString = ({ value, setValue, setIsError }) => {

  const {
    storeData
  } = useCalculator();

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue); // Setze den Wert, wenn er nicht leer ist, als float, ansonsten als leeren String
  };

  useEffect(() => {
    if (value === '') {
      setError('Das Feld darf nicht leer sein.');
    } else {
      setError('');
    }
    setIsError(value === '');
  }, [value, setIsError]);

  return (
    <div>
      <input
        className={`input ${error ? 'error-border' : ''}`}
        value={value}
        onChange={handleChange}
        type="text"
        list='projekts'
      />
      {error && <p className='errorMessage'>{error}</p>}

      <datalist id="projekts">
        {storeData.map((item, index) => (
          <option key={index} value={item.idProjekt} />
        ))}
      </datalist>
    </div>
  );
};

export default InputString;
