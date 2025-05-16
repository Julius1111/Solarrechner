import React, { useRef, useState } from 'react';
import './userInput.css';
import InputNumber from '../inputNumber/inputNumber.jsx';
import InputRadioButton from '../inputRadioButton/inputRadioButton.jsx';
import InputProjekt from '../inputString/inputProjekt.jsx';
import { useCalculator } from '../CalculatorContext.js';
import supabase from '../../config/superbaseClient.js';
import LogOut from '../auth/LogOut.jsx';

import LocationInput from './location/locationInput.jsx';

const Rechner = () => {
  
    const mapRef = useRef();

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
        stromVerbrauch, setStromVerbrauch,
        baterieKapazitat, setBaterieKapazitat, 
        angel, setAngel,
        azimuth, setAzimuth,
        markerPosition
      } = useCalculator();
      
    let dataToSave = {idProjekt, einspeiseModell, gesKosten, leistung, stromErtrag, eigenVerbrauch, einspeiseVergutung, stromPreis, stromPreisErhohung, betriebsKosten, betriebsKostenErhohung, stromVerlust, zeitRaum, vergleichRenditeProzent, betriebsKostenEuroProzent, betriebsKostenProzent, angel, azimuth, baterieKapazitat, markerPosition, stromVerbrauch};

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
            //console.log(data);
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
                mapRef.current.changePosition(fatchedData.markerPosition[0], fatchedData.markerPosition[1]); // funktion um Marker und viewport zu setzen  // wichtig nicht als array übergeben also nicht in [] --> error latlng null
            }
        }
    }

    const [newRender, setNewRender] = useState(""); // variable ändern zum abrufen der neuen IDs

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
        
        setNewRender(idProjekt); // ändern der Variable
    };

    const handleLoadeData = () => {
        fatchData();
    }


  return (
    <>
    

    <LogOut/>


    <div className='containerInput margin'>
        <p className='customSchrift'>Projekt</p>

        <div className='rechner_input '>
            <p>Name des Projektes</p>
            
            <InputProjekt value={idProjekt} setValue={setIdProjekt} setIsError={setIsError} getNewIDs={newRender}></InputProjekt>
        </div>

        <div className='centerButton'>
            <button className='customButton' onClick={handleLoadeData}>Loade Data</button>
            <button className='customButton' onClick={handleSave}>Speichern</button>
        </div>
        
    </div>


    <div className='container_rechner'>
        
        
        <div className='containerInput containerMap'>
            <LocationInput ref={mapRef}/>
        </div>
       

        <div className='containerInput'>

            <p className='customSchrift'>PV-Anlage</p>

            <div className='rechner_input'>
                <p>Einspeisemodell</p>
                <InputRadioButton value={einspeiseModell} setValue={setEinspeiseModell} name1="Eigenverbrauch mit Überschusseinspeisung" name2="Volleinspeisung" id="Einspeisemodell"/>
            </div>
                    
                    
            <div className='rechner_input'>
                <p>Anschafungskosten in €</p>
                <InputNumber value={gesKosten} setValue={setGesKosten} setIsError={setIsError} min={0} max={100000} />
            </div>
                    
            <div className='rechner_input'>
                <p>Leistung der PV-Anlage in kWp</p>
                <InputNumber value={leistung} setValue={setLeistung} setIsError={setIsError} min={0} max={20}/>
            </div>

            <div className='rechner_input'>
                <p>Batterie Kapazität in kWh</p>
                <InputNumber value={baterieKapazitat} setValue={setBaterieKapazitat} setIsError={setIsError} min={0} max={20}/>
            </div>

            <div className='rechner_input'>
                <p>Neigungswinkel in °</p>
                <InputNumber value={angel} setValue={setAngel} setIsError={setIsError} min={0} max={90}/>
            </div>

            <div className='rechner_input'>
                <p>Azimuth (Ausrichtung Süd = 0, Ost = -90, West = 90, Nord = +-180)</p>
                <InputNumber value={azimuth} setValue={setAzimuth} setIsError={setIsError} min={-180} max={180}/> 
            </div>
        </div>

        <div className='containerInput'>

            <p className='customSchrift'>Ertrag und Strompreis</p>

            <div className='rechner_input'>
                <p>Jählicher Stromverbrauch in kwh</p>
                <InputNumber value={stromVerbrauch} setValue={setStromVerbrauch} setIsError={setIsError} max = {10000} min={2000}/>
            </div>

            <div className='rechner_input'>
                <p>Jählicher Stromertrag kwh pro kWp</p>
                <InputNumber value={stromErtrag} setValue={setStromErtrag} setIsError={setIsError} disabled={true}/>
            </div>

            {einspeiseModell === '0' && 
                <div className='rechner_input'>
                    <p>Eigenverbrauch in %</p>
                    <InputNumber value={eigenVerbrauch} setValue={setEigenVerbrauch} setIsError={setIsError} disabled={true} />
                </div>
            }

            <div className='rechner_input'>
                <p>Einspeisevergütung in €</p>
                <InputNumber value={einspeiseVergutung} setValue={setEinspeiseVergutung}  setIsError={setIsError} min={0} max={10}/>
            </div>

            {einspeiseModell === '0' && 
            <>
                <div className='rechner_input'>
                    <p>Strompreis pro kwh in €</p>
                    <InputNumber value={stromPreis} setValue={setStromPreis} setIsError={setIsError} min={0} max={10}/>
                </div>

                <div className='rechner_input'>
                    <p>Strompreis erhöhung pro Jahr in %</p>
                    <InputNumber value={stromPreisErhohung} setValue={setStromPreisErhohung} setIsError={setIsError} min={0} max={100}/>
                </div>
            </>
            }

            <div className='rechner_input'>
                <p>Minderung Stromertrag pro Jahr in %</p>
                <InputNumber value={stromVerlust} setValue={setStromVerlust}  setIsError={setIsError} min={0} max={10}/>
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
                <InputNumber value={betriebsKostenProzent} setValue={setBetriebsKostenProzent} setIsError={setIsError} min={0} max={100}/>
            </div>
            }   

            {betriebsKostenEuroProzent === '1' && 
            <div className='rechner_input'>
                <p>Betriebskosten in €</p>
                <InputNumber value={betriebsKosten} setValue={setBetriebsKosten} setIsError={setIsError} min={0} max={10000} />
            </div>
            }   

            <div className='rechner_input'>
                <p>Betriebskostensteigerung pro Jahr in %</p>
                <InputNumber value={betriebsKostenErhohung} setValue={setBetriebsKostenErhohung}  setIsError={setIsError} min={0} max={100}/>
            </div>
        </div>
       
        <div className='containerInput'>

            <p className='customSchrift'>Zeitraum und Vergleich</p>

            <div className='rechner_input'>
                <p>Zeitraum in Jahren</p>
                <InputNumber value={zeitRaum} setValue={setZeitRaum}  setIsError={setIsError} min={0} max={100}/>
            </div>

            <div className='rechner_input'>
                <p>vergleich Rendite in %</p>
                <InputNumber value={vergleichRenditeProzent} setValue={setVergleichRenditeProzent}  setIsError={setIsError} min={-100} max={100}/>
            </div>
        </div>
    </div>

    <div className='centerButton'>
        
    </div>
        
    </>
  );
};

export default Rechner;
