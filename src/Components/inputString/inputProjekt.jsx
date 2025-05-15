import React, { useEffect, useState } from 'react';

import '../inputNumber/inputNumber.css';
import supabase from '../../config/superbaseClient.js';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const InputProjekt = ({ value, setValue, setIsError, getNewIDs }) => {

    const [error, setError] = useState('');
    const [ids, setIds] = useState([]);

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
            const arrayData =  data.map((item) => item.idProjekt)
            if(!arrayData.includes(getNewIDs))
            {
                arrayData.push(getNewIDs);
            }
            setIds(arrayData);

            console.log(arrayData)
        }
    }

    // get IDs
    useEffect(() => {
        getAllIds();
    }, [getNewIDs]);

  return (
    <div>
        <Autocomplete
            value={value}
            disablePortal
            options={ids}
            
            renderInput={(params) => 
            <TextField 
                {...params} 
                color='gray'
                label="Projekt" 
                error={!!error}
            />}

            onInputChange={(event, newInputValue) => {
                setValue(newInputValue);
            }}
        />

        {error && <p className='errorMessage'>{error}</p>}
    </div>
  )
}

export default InputProjekt
