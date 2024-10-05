import { useEffect } from "react";
import { useCalculator  } from "./CalculatorContext";
import supabase from "../config/superbaseClient";
import { getUserId } from "../config/superbaseClient";

const Berechnung = () =>{
       
    const {
        idProjekt,
        einspeiseModell, 
        gesKosten, 
        leistung,
        stromErtrag, 
        eigenVerbrauch, 
        einspeiseVergutung, 
        stromPreis, 
        stromPreisErhohung, 
        betriebsKosten, 
        betriebsKostenErhohung, 
        stromVerlust, 
        zeitRaum, 
        vergleichRenditeProzent, 
        betriebsKostenEuroProzent, 
        betriebsKostenProzent, 
        updateCalculatedData,
        saveBerechnung, setSaveBerechnung,
      } = useCalculator();
    
    const berechneUndAktualisieren = (saveData) => {
        
        let verguetungEEG = 0; //Vergütung nach Einspeisevergütung
        let verguetungEig = 0; // Vergütung nach Eigenverbrauch
        
        let jahr = [];
        let gesErzeugtStrom = [];
        let eigErzeugtStrom = [];
        let eigErtrag = []; // Ertrag aus Eigenverbrauch
        let verErtrag = []; // Ertrag aus Netzeinspeisung
        let gesErtrag = [];
        let uberschuss = []; // Jährlicher finanzieller Überschuss
        let gesBetriebsKosten =[];
        let amortisation = -1;
        let uberschussProJahr = [];
        let gewinn; 
        let rendite;
        let renditeProjahr;
        let vergleichRendite = [];
        let vergleichRenditeKonto =[];
        let gesErzeugterStrom = 0;
        let gesErzeugterStromEig = 0;
        let gesErtragEig = 0;
        let gesErtragVer = 0;
        let gesUberschuss = 0;
        let co2Einsparung = 0;

        let stromKosten = stromPreis;
        let erzeugterStrom = stromErtrag; 
        let betrieb = betriebsKosten;
        let eig = eigenVerbrauch / 100.0; // eigenverbrauch als Dezimalzahl
        const faktorBetKostErhohung = betriebsKostenErhohung / 100;
        const faktorStromVerlust = stromVerlust / 100.0;
        const faktorVergleichsRendite = 1 + vergleichRenditeProzent / 100.0;
        const faktorStromPreisErhohung = stromPreisErhohung / 100.0;


        // prüfen ob betriebskosten in Prozent gegeben sind
        if(betriebsKostenEuroProzent === '0')
        {
            betrieb = gesKosten * betriebsKostenProzent / 100; 
        }
        
        
        // Durchlaufen des Zeitraums von 20 Jahren
        for(let i = 0; i < zeitRaum; i++)
        {
            // Vergütung bestimmen
            if(einspeiseModell === "0"){ // Überschusseinspeisung

                verguetungEEG = (1 - eig) * einspeiseVergutung;
                verguetungEig = eig * stromKosten;
            }
            else{   // Volleinspeiser
                
                verguetungEEG = einspeiseVergutung; 
                verguetungEig = 0; 
                eig = 0; // Eigenverbrauch auf Nullsetzen 
            }

            // Einspeisevergütung nur 20 Jahre
            if(i > 19)
            {
                verguetungEEG = 0; 
            }

            // Erzeugter Strom
            gesErzeugtStrom[i] = erzeugterStrom * leistung;
            eigErzeugtStrom[i] = gesErzeugtStrom[i] * eig;
            gesErzeugterStrom += gesErzeugtStrom[i];
            gesErzeugterStromEig += eigErzeugtStrom[i];

            // Ertrag
            eigErtrag[i] = gesErzeugtStrom[i]  * verguetungEig;
            verErtrag[i] = gesErzeugtStrom[i] * verguetungEEG; 
            gesErtrag[i] = eigErtrag[i] + verErtrag[i];

            gesErtragEig += eigErtrag[i];
            gesErtragVer += verErtrag[i];
            

            // Überschuss
            uberschuss[i] = gesErtrag[i] - betrieb; 

            gesUberschuss += uberschuss[i]; 
            

            // Betriebskosten
            gesBetriebsKosten[i] = betrieb;

            erzeugterStrom -= erzeugterStrom * faktorStromVerlust; 
            betrieb += betrieb * faktorBetKostErhohung;  
            stromKosten += stromKosten * faktorStromPreisErhohung; 

            jahr[i] = i + 1; // anzahl der Jahre mitzählen

            // array füllen
            vergleichRenditeKonto[i] = gesKosten;
        }

        // Überschuss aufsummieren pro Jahr && Brechnung Vergleichrendite
        // erstes Jahr initialisieren
        uberschussProJahr[0] = uberschuss[0];
        vergleichRendite[0] = gesKosten;

        for(let k = 1; k < zeitRaum; k++)
        {
            uberschussProJahr[k] = uberschussProJahr[k -1] + uberschuss[k];
            vergleichRendite[k] = vergleichRendite[k -1] * faktorVergleichsRendite;
        }
        
        // amortisations Zeit berechnen 

        for(let j = 0; j < zeitRaum; j++)
        {
            if(gesKosten <= uberschussProJahr[j])
            {
                amortisation = j + 1; 
                break;
            }
        }

        const umsatz = uberschussProJahr[zeitRaum -1];

        // Rendite / Gewinn Berrechnen

        gewinn = umsatz - gesKosten; 
        rendite = gewinn / gesKosten * 100 ;
        renditeProjahr = rendite / zeitRaum;
        
        
        // Co2 Einsparung

        co2Einsparung = gesErzeugterStrom * 0.32 / 1000;

        // Objekt erstellen
        const data = {
            idProjekt: idProjekt,
            jahr: jahr,
            gesErzeugtStrom: gesErzeugtStrom,
            eigErzeugtStrom: eigErzeugtStrom,
            eigErtrag: eigErtrag,
            verErtrag: verErtrag,
            gesErtrag: gesErtrag,
            uberschuss: uberschuss,
            gesBetriebsKosten: gesBetriebsKosten,
            amortisation: amortisation,
            uberschussProJahr: uberschussProJahr,
            gesKosten: gesKosten,
            gewinn: gewinn,
            rendite: rendite,
            renditeProJahr: renditeProjahr,
            vergleichRendite: vergleichRendite,
            vergleichRenditeKonto: vergleichRenditeKonto,
            gesErzeugterStrom: gesErzeugterStrom,
            gesErzeugterStromEig: gesErzeugterStromEig,
            gesErtragEig: gesErtragEig,
            gesErtragVer: gesErtragVer,
            gesUberschuss: gesUberschuss,
            co2Einsparung: co2Einsparung,
        };

        // nur Daten speichern wenn gewünscht 
        if(saveBerechnung === 1 ){ 
            setSaveBerechnung(0);

            // aulagern (clean code)
            const saveData = async () => {

                // get user id
                const userId = await getUserId();
                if (!userId) {
                    throw new Error("User is not authenticated");
                }

                // Prüfen ob bereits vorhanden
                const { data: existingData, error: selectError } = await supabase
                    .from('CalculadedData')
                    .select('idProjekt')
                    .eq('idProjekt', idProjekt)
                
                if (selectError) {
                    console.log('Fehler beim Überprüfen auf vorhandene Daten:', selectError);
                    return;
                }

                if (existingData && existingData.length > 0) { // existingData.length > 0 da sonst null sein könnte --> error
                    // daten updaten
                    const { error: updateError } = await supabase
                        .from('CalculadedData')
                        .update([data])
                        .eq('idProjekt', idProjekt)

                    if (updateError) {
                        console.log('Fehler beim Aktualisieren des Datensatzes:', updateError);
                    }
                    return;
                }

                // falls nicht neu erstellen
                const {savedData, error} = await supabase
                    .from('CalculadedData')
                    .insert([data]) // user id übergeben
                    .select()

                if(error)
                {
                    console.log(error);
                }

                if(savedData){
                    console.log(saveData);
                }
            }

            saveData();
        }
    

        updateCalculatedData(data);
    };

    // bei änderung Aktualisieren
    useEffect(() => {
        berechneUndAktualisieren();
      }, [saveBerechnung ,einspeiseModell, gesKosten, leistung, stromErtrag, eigenVerbrauch, einspeiseVergutung, stromPreis, stromPreisErhohung, betriebsKosten, betriebsKostenErhohung, stromVerlust, zeitRaum, vergleichRenditeProzent, betriebsKostenEuroProzent, betriebsKostenProzent]);

    return null;
}

export default Berechnung