import React, { useEffect, useState } from 'react';
import './inputNumber.css';

const InputNumber = ({ value, setValue, setIsError, disabled = false,  max, min}) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue === '' ? '' : parseFloat(newValue)); // Setze den Wert, wenn er nicht leer ist, als float, ansonsten als leeren String
  };

  useEffect(() => {

    if (value === '') {
      setError('Das Feld darf nicht leer sein.');
      return;
    } else {
      setError('');
    }

    const newValue = parseFloat(value);

    // min max gesetzt
    if(min !== undefined && max !== undefined)
    { 
        if(newValue <= max && newValue >= min){ setError('')}
        else{setError("Der Wert muss zwischen " + min + " und " + max + " liegen");}  
        return
    }

    // nur min gesetzt
    if(min !== undefined)
    {
      if(newValue >= min){ setError('')}
      else{setError("Der Wert muss größer / gleich " + min + " sein");}  
      return
    }

     // nur max gesetzt
     if(max !== undefined)
      { 
          if(newValue <= max ){ setError('')}
          else{setError("Der Wert muss kleiner / gleich " + max + " sein");}  
          return
      }

    setIsError(value === '');
  }, [value, setIsError]);

  return (
    <div>
      <input
        className={`input ${error ? 'error-border' : ''}`}
        value={value}
        onChange={handleChange}
        type="number"
        disabled = {disabled}
      />
      {error && <p className='errorMessage'>{error}</p>}
    </div>
  );
};

export default InputNumber;
