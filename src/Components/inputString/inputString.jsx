import React, { useEffect, useState } from 'react';
import '../inputNumber/inputNumber.css';

const InputString = ({ value, setValue, setIsError }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue === '' ? '' : parseFloat(newValue)); // Setze den Wert, wenn er nicht leer ist, als float, ansonsten als leeren String
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
      />
      {error && <p className='errorMessage'>{error}</p>}
    </div>
  );
};

export default InputString;
