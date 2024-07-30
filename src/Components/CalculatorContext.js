import React, { createContext, useState, useContext } from 'react';

// Context erstellen
const CalculatorContext = createContext();

// Provider erstellen
export const CalculatorProvider = ({ children }) => {
  // Zustandsvariablen
  const [isError, setIsError] = useState(false);
  const [einspeiseModell, setEinspeiseModell] = useState('0');
  const [gesKosten, setGesKosten] = useState(15000);
  const [leistung, setLeistung] = useState(10);
  const [stromErtrag, setStromErtrag] = useState(950);
  const [eigenVerbrauch, setEigenVerbrauch] = useState(20);
  const [einspeiseVergutung, setEinspeiseVergutung] = useState(0.081);
  const [stromPreis, setStromPreis] = useState(0.32);
  const [stromPreisErhohung, setStromPreisErhohung] = useState(2);
  const [betriebsKosten, setBetriebsKosten] = useState(150);
  const [betriebsKostenErhohung, setBetriebsKostenErhohung] = useState(1.50);
  const [stromVerlust, setStromVerlust] = useState(0.25);
  const [zeitRaum, setZeitRaum] = useState(20);
  const [vergleichRenditeProzent, setVergleichRenditeProzent] = useState(5);
  const [betriebsKostenEuroProzent, setBetriebsKostenEuroProzent] = useState('0');
  const [betriebsKostenProzent, setBetriebsKostenProzent] = useState(1.5);

  // Berrechnerte Daten
  const [calculatedData, setCalculatedData] = useState({
    name: '',
    gesErzeugtStrom: 0,
    eigErzeugtStrom: 0,
    eigErtrag: 0,
    verErtrag: 0,
    gesErtrag: 0,
    uberschuss: 0,
    betriebskosten: 0,
    amortisation: 0,
    uberschussProJahr: 0,
    gesKosten: 0,
    gewinn: 0,
    rendite: 0,
    renditeProJahr: 0,
    vergleichRendite: 0,
    vergleichRenditeKonto: 0,
    gesErzeugterStrom: 0,
    gesErzeugterStromEig: 0,
    gesErtragEig: 0,
    gesErtragVer: 0,
    gesUberschuss: 0,
    co2Einsparung: 0,
  });

    

  // Funktion zum Aktualisieren der berechneten Daten
  const updateCalculatedData = (newData) => {
    setCalculatedData(newData);
  };

// Objekt erstellen 
const value = {
    isError, setIsError,
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
    updateCalculatedData, calculatedData
};

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

// Custom Hook 
export const useCalculator = () => useContext(CalculatorContext);