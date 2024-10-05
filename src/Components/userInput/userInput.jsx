import React from 'react';
import './userInput.css';
import InputNumber from '../inputNumber/inputNumber.jsx';
import InputRadioButton from '../inputRadioButton/inputRadioButton.jsx';
import InputString from '../inputString/inputString.jsx'
import { useCalculator } from '../CalculatorContext.js';
import supabase from '../../config/superbaseClient.js';

const Rechner = () => {
  
    const {
        isError, setIsError,
        idProjekt, setIdProjekt,
        einspeiseModell, setEinspeiseModell,
        gesKosten, setGesKosten,
        leistung, setLeistung,
        stromErtrag, setStromErtrag,
        eigenVerbrauch, setEigenVerbrauch,
        einspeiseVergutung, setEinspeiseVergutung,
        stromPreis, setStromPreis,
        stromPreisErhohung, setStromPreisErhohung,
        betriebsKosten, setBetriebsKosten,
        betriebsKostenErhohung, setBetriebsKostenErhohung,
        stromVerlust, setStromVerlust,
        zeitRaum, setZeitRaum,
        vergleichRenditeProzent, setVergleichRenditeProzent,
        betriebsKostenEuroProzent, setBetriebsKostenEuroProzent,
        betriebsKostenProzent, setBetriebsKostenProzent,
        loadeData ,
        setSaveBerechnung, 
      } = useCalculator();
      
    let dataToSave = {idProjekt, einspeiseModell, gesKosten, leistung, stromErtrag, eigenVerbrauch, einspeiseVergutung, stromPreis, stromPreisErhohung, betriebsKosten, betriebsKostenErhohung, stromVerlust, zeitRaum, vergleichRenditeProzent, betriebsKostenEuroProzent, betriebsKostenProzent};

    const saveData = async () => {
        
        // Prüfen ob bereits vorhanden
        const { data: existingData, error: selectError } = await supabase
            .from('Userinput')
            .select('idProjekt')
            .eq('idProjekt', idProjekt)
            

        if (selectError) {
            console.log('Fehler beim Überprüfen auf vorhandene Daten:', selectError);
            return;
        }

        if (existingData && existingData.length > 0) { // existingData.length > 0 da sonst null sein könnte --> error
            // daten updaten
            const { error: updateError } = await supabase
                .from('Userinput')
                .update([dataToSave])
                .eq('idProjekt', idProjekt)

            if (updateError) {
                  console.log('Fehler beim Aktualisieren des Datensatzes:', updateError);
            }
            return;
        }

        // falls nicht neu erstellen
        const {data, error} = await supabase
            .from('Userinput')
            .insert([dataToSave])
            .select()

        if(error)
        {
            console.log(error);
        }

        if(data){
            console.log(data);
        }
    }

    const fatchData = async () => {

        

        // Prüfen ob bereits vorhanden
        const { data: existingData, error: selectError } = await supabase
            .from('Userinput')
            .select('idProjekt')
            .eq('idProjekt', idProjekt)
        
           

        if (selectError) {
            console.log('Fehler beim Überprüfen auf vorhandene Daten:', selectError);
            return;
        }
        
        if (existingData && existingData.length > 0) {
            const { data: fatchedData, error: fatchError } = await supabase
                .from('Userinput')
                .select('*')
                .eq('idProjekt', idProjekt)
                .single()
            
            if(fatchError)
            {
                console.log("Fatch error")
                console.log(fatchError);
            }

            if(fatchedData)
            {
                loadeData(fatchedData);
            }
        }
    }

    const handleSave = () => {
        // Abbruch bei fehlender Eingabe
        if(isError) 
        {
            console.log("error");
            return
        }

        // In Datenbank speichern
        saveData();

        // toggel variable to trigger function 
         setSaveBerechnung(1);
        
        
       
    };

    const handleLoadeData = () => {
        fatchData();
    }


  return (
    <>
    <div className='centerH1'>
        <h1 >Solar Rechner</h1>
    </div>

    <div className='containerInput margin'>
        <p className='customSchrift'>Projekt</p>

        <div className='rechner_input '>
            <p>Name des Projektes</p>
            <InputString value={idProjekt} setValue={setIdProjekt} setIsError={setIsError}></InputString>
        </div>

        <div className='centerButton'>
            <button className='customButton' onClick={handleLoadeData}>Loade Data</button>
            <button className='customButton' onClick={handleSave}>Speichern</button>
        </div>
        
    </div>

    <div className='container_rechner'>
        
        <div className='containerInput'>

            <p className='customSchrift'>PV-Anlage</p>

            <div className='rechner_input'>
                <p>Einspeisemodell</p>
                <InputRadioButton value={einspeiseModell} setValue={setEinspeiseModell} name1="Eigenverbrauch mit Überschusseinspeisung" name2="Volleinspeisung" id="Einspeisemodell"/>
            </div>
                    
                    
            <div className='rechner_input'>
                <p>Anschafungskosten in €</p>
                <InputNumber value={gesKosten} setValue={setGesKosten} setIsError={setIsError} />
            </div>
                    
            <div className='rechner_input'>
                <p>Leistung der PV-Anlage in kWp</p>
                <InputNumber value={leistung} setValue={setLeistung} setIsError={setIsError} />
            </div>
        </div>

        <div className='containerInput'>

            <p className='customSchrift'>Ertrag und Strompreis</p>

            <div className='rechner_input'>
                <p>Jählicher Stromertrag kwh pro kWp</p>
                <InputNumber value={stromErtrag} setValue={setStromErtrag} setIsError={setIsError} />
            </div>

            {einspeiseModell === '0' && 
                <div className='rechner_input'>
                    <p>Eigenverbrauch in %</p>
                    <InputNumber value={eigenVerbrauch} setValue={setEigenVerbrauch} setIsError={setIsError} />
                </div>
            }

            <div className='rechner_input'>
                <p>Einspeisevergütung in €</p>
                <InputNumber value={einspeiseVergutung} setValue={setEinspeiseVergutung}  setIsError={setIsError}/>
            </div>

            {einspeiseModell === '0' && 
            <>
                <div className='rechner_input'>
                    <p>Strompreis pro kwh in €</p>
                    <InputNumber value={stromPreis} setValue={setStromPreis} setIsError={setIsError} />
                </div>

                <div className='rechner_input'>
                    <p>Strompreis erhöhung pro Jahr in %</p>
                    <InputNumber value={stromPreisErhohung} setValue={setStromPreisErhohung} setIsError={setIsError} />
                </div>
            </>
            }

            <div className='rechner_input'>
                <p>Minderung Stromertrag pro Jahr in %</p>
                <InputNumber value={stromVerlust} setValue={setStromVerlust}  setIsError={setIsError}/>
            </div>

        </div>

        <div className='containerInput'>

            <p className='customSchrift'>Laufendekosten</p>

            <div className='rechner_input'>
                <p>Betriebskosten pro Jahr</p>
                <InputRadioButton value={betriebsKostenEuroProzent} setValue={setBetriebsKostenEuroProzent} name1="in Prozent der Anschaffungskosten" name2="in Euro" id="Betriebskosten"/>
            </div>
            
            {betriebsKostenEuroProzent === '0' && 
            <div className='rechner_input'>
                <p>Betriebskosten in % </p>
                <InputNumber value={betriebsKostenProzent} setValue={setBetriebsKostenProzent} setIsError={setIsError} />
            </div>
            }   

            {betriebsKostenEuroProzent === '1' && 
            <div className='rechner_input'>
                <p>Betriebskosten in €</p>
                <InputNumber value={betriebsKosten} setValue={setBetriebsKosten} setIsError={setIsError} />
            </div>
            }   

            <div className='rechner_input'>
                <p>Betriebskostensteigerung pro Jahr in %</p>
                <InputNumber value={betriebsKostenErhohung} setValue={setBetriebsKostenErhohung}  setIsError={setIsError}/>
            </div>
        </div>
       
        <div className='containerInput'>

            <p className='customSchrift'>Zeitraum und Vergleich</p>

            <div className='rechner_input'>
                <p>Zeitraum in Jahren</p>
                <InputNumber value={zeitRaum} setValue={setZeitRaum}  setIsError={setIsError}/>
            </div>

            <div className='rechner_input'>
                <p>vergleich Rendite in %</p>
                <InputNumber value={vergleichRenditeProzent} setValue={setVergleichRenditeProzent}  setIsError={setIsError}/>
            </div>
        </div>
    </div>

    <div className='centerButton'>
        
    </div>
        
    </>
  );
};

export default Rechner;
