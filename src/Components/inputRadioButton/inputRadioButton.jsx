import React from 'react';
import './inputRadioButton.css';

const InputRadioButton = ({ value, setValue, name1, name2, id }) => {
  
  const handleDivClick = (newValue) => {
    setValue(newValue); 
  };

  return (
    <div className='container_radiobutton'>
        <div className={`radiobutton0 radiobutton ${value === "0" ? 'aktiveBorder' : ''}`} onClick={() => handleDivClick('0')} >
            <input
                type="radio"
                id={id}
                name={id}
                value="0"
                checked={value === '0'}
                
            />
            <label htmlFor={id}>
                {name1}
            </label>
        </div>
      
        <div className={`radiobutton1 radiobutton ${value === "1" ? 'aktiveBorder' : ''}`} onClick={() => handleDivClick('1')} >
            <input
                type="radio"
                id={id + "1"}
                name={id}
                value="1"
                checked={value === '1'}
                
            />
            <label htmlFor={id + "1"}>
                {name2}
            </label>
        </div>
    </div>
  );
};

export default InputRadioButton;
