import React, {useState} from "react";
import InputRadioButton from "../inputRadioButton/inputRadioButton";
import { useCalculator  } from "../CalculatorContext";
import Auswertung from "./auswertung";

const SwitchAuswertung = () => {
    
    const {idProjekt}  = useCalculator();

    const [switchValue, setSwitchValue] = useState('0');


    return (
    <>
        <div className='containerInput margin'>
        
            <p className='customSchrift'>Auswertung</p>

            <div className='rechner_input'>
                <p>Wähle eine Auswertungsform</p>
                <InputRadioButton value={switchValue} setValue={setSwitchValue} name1={'Dieses Projekt'} name2={'Vergleich von Projekten'} id={'Auswertung'}/>
            </div>

        </div>

        {switchValue === '0' &&
            <Auswertung/>
        }

        {switchValue === '1' &&
            <></>
        }

    </>
    
    );
}

export default SwitchAuswertung;
  