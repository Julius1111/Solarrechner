import React, { useEffect, useState } from 'react';
import '../inputNumber/inputNumber.css';
import supabase from '../../config/superbaseClient.js';

const InputString = ({ value, setValue, setIsError }) => {


  const [error, setError] = useState('');
  const [ids, setIds] = useState([]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue); // Setze den Wert, wenn er nicht leer ist, als float, ansonsten als leeren String
  };

  // error Eingabe prüfen
  useEffect(() => {
    if (value === '') {
      setError('Das Feld darf nicht leer sein.');
    } else {
      setError('');
    }
    setIsError(value === '');
  }, [value, setIsError]);

  // ids von der Datenbank abrufen
  const getAllIds = async () => {
    const { data, errorDb } = await supabase
      .from('Userinput')
      .select('idProjekt');

    if (errorDb) {
      console.log('Fehler beim Abrufen der IDs:', error);
      return;
    }

    if (data) {
      setIds(data)
    }
  }

  return (
    <div>
      <input
        className={`input ${error ? 'error-border' : ''}`}
        value={value}
        onChange={handleChange}
        onClick={getAllIds}
        type="text"
        list='projekts'
      />
      {error && <p className='errorMessage'>{error}</p>}

      <datalist id="projekts">
        {ids.map((item, index) => (
          <option key={index} value={item.idProjekt} />
        ))}
      </datalist>
    </div>
  );
};

export default InputString;
