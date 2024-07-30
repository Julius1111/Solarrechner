import { useEffect } from "react";
import { useCalculator  } from "./CalculatorContext";

const Berechnung = () =>{
       
    const {
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
        updateCalculatedData
      } = useCalculator();
    
    const berechneUndAktualisiere = () => {
        let verguetungEEG; //Vergütung nach Einspeisevergütung
        let verguetungEig; // Vergütung nach Eigenverbrauch
        let uberschuss = [];
        let eigErtrag = [];
        let verErtrag = [];
        let gesErtrag = [];
        let gesBetriebsKosten =[];
        let pvStromErzeugt = [];
        let pvStromErzeugtEig = [];
        let amortisation = -1;
        let name = [];
        let uberschussProJahr = [];
        let renditeProjahr;
        let rendite;
        let gewinn; 
        let vergleichRendite = [];
        let vergleichRenditeKonto =[];
        let gesErzeugterStrom = 0;
        let gesErzeugterStromEig = 0;
        let gesErtragEig = 0;
        let gesErtragVer = 0;
        let gesUberschuss = 0;
        let co2Einsparung = 0;

        let strom = stromPreis;
        let erzeugterStrom = stromErtrag; 
        let betrieb = betriebsKosten;
        let eig = eigenVerbrauch / 100.0 // eigenverbrauch als Dezimalzahl
        const betKostErhohung = betriebsKostenErhohung / 100;
        
        if(betriebsKostenEuroProzent === '0')
        {
            betrieb = gesKosten * betriebsKostenProzent / 100; 
        }
        
        // Durchlaufen des Zeitraums von 20 Jahren
        for(let i = 0; i < zeitRaum; i++)
        {
            // Ertrag pro Jahr 
            if(einspeiseModell === "0")  // Eigenverbrauch mit Einspeiseung
            {   
                if(i >= 1) strom += strom * (stromPreisErhohung / 100.0)  // Strompreis erhöhen ab 1 Jahr

                // Einspeisevergütung bis 20 Jahre
                if(i < 20) 
                {
                    verguetungEig = eig * strom;
                    verguetungEEG = (1 - eig) * einspeiseVergutung;
                }
                else{ // nur eigenverbrauch
                    verguetungEig = eig * strom
                    verguetungEEG = 0;
                }

                // Ertrag
                eigErtrag[i] = erzeugterStrom * leistung  * verguetungEig;
                verErtrag[i] = erzeugterStrom * leistung * verguetungEEG;
            }
            else{   // Volleinspeiser
                if(i < 20) // nur für 20 Jahre
                {
                    verguetungEEG = einspeiseVergutung; 
                }
                else verguetungEEG = 0;
                eig = 0; // fix Bug selbstverbrauchter Stom bei Volleinspeiser
                verErtrag[i] = erzeugterStrom * leistung * verguetungEEG;
                eigErtrag[i] = 0; // Kein Eigenverbrauch bei Volleinspeisung
            }
            
            gesErtrag[i] = eigErtrag[i] + verErtrag[i]; 
            uberschuss[i] = gesErtrag[i] - betrieb; // Jährlicher Überschuss (Ersparniss) gesamt
            gesBetriebsKosten[i] = betrieb;
            pvStromErzeugt[i] = erzeugterStrom * leistung;
            pvStromErzeugtEig[i] = erzeugterStrom * eig * leistung;

            erzeugterStrom -= erzeugterStrom * (stromVerlust / 100.0); // Strom Verlust durch Degration
            betrieb += betrieb * betKostErhohung  // betriebskosten erhöhen ab 1 Jahr
            
            gesUberschuss += uberschuss[i]; 

            name[i] = i + 1;
        }

        // Überschuss aufsummieren pro Jahr && Brechnung Vergleichrendite
        for(let k = 0; k < zeitRaum; k++)
        {
            if(k > 0){
                uberschussProJahr[k] = uberschuss[k] + uberschussProJahr[k -1];
                vergleichRendite[k] = vergleichRendite[k -1] * (1 + vergleichRenditeProzent / 100.0);
                vergleichRenditeKonto[k] = vergleichRenditeKonto[k -1]; // inflation nicht berücksichtigt
            } 
            else
            {
                uberschussProJahr[k] = uberschuss[k];
                vergleichRendite[k] = gesKosten;
                vergleichRenditeKonto[k] = gesKosten;
            }
            gesErzeugterStrom += pvStromErzeugt[k];
            gesErzeugterStromEig += pvStromErzeugtEig[k];
            gesErtragEig += eigErtrag[k];
            gesErtragVer += verErtrag[k];
        }
        
        // amortisations Zeit berechnen 
        let dummy = 0;
        for(let j = 0; j < zeitRaum; j++)
        {
            dummy += uberschuss[j];
            if(gesKosten <= dummy)
            {
                amortisation = j +1; 
                break;
            }
        }

        // Rendite / Gewinn Berrechnen
        const umsatz = uberschussProJahr[zeitRaum -1];
        gewinn = umsatz -gesKosten; 
        renditeProjahr = gewinn / gesKosten / zeitRaum * 100;
        rendite = gewinn * 100 / gesKosten;
        
        // Co2 Einsparung
        co2Einsparung = gesErzeugterStrom * 0.32 / 1000;

        // Objekt erstellen
        const data = {
            name: name,
            gesErzeugtStrom: pvStromErzeugt,
            eigErzeugtStrom: pvStromErzeugtEig,
            eigErtrag: eigErtrag,
            verErtrag: verErtrag,
            gesErtrag: gesErtrag,
            uberschuss: uberschuss,
            betriebskosten: gesBetriebsKosten,
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

        updateCalculatedData(data);
        
    };

    // bei änderung Aktualisieren
    useEffect(() => {
        berechneUndAktualisiere();
      }, [einspeiseModell, gesKosten, leistung, stromErtrag, eigenVerbrauch, einspeiseVergutung, stromPreis, stromPreisErhohung, betriebsKosten, betriebsKostenErhohung, stromVerlust, zeitRaum, vergleichRenditeProzent, betriebsKostenEuroProzent, betriebsKostenProzent]);

    return null;
}

export default Berechnung