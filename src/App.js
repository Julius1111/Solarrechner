import './App.css';
import React from 'react';
import Rechner from './Components/rechner/rechner.jsx'
import Auswertung from './Components/Auswertung/auswertung.jsx';
import { CalculatorProvider, useCalculator } from './Components/CalculatorContext.js';
import Berechnung from './Components/Berechnungen.js';

function AppContent() {
  const { calculatedData } = useCalculator();

  return (
    <div className="App">
      <Berechnung/>
      <Rechner />
      {calculatedData && calculatedData.name.length > 0 && (
        <Auswertung data={calculatedData} />
      )}
    </div>
  );
}

function App() {
  return (
    <CalculatorProvider>
      <AppContent />
    </CalculatorProvider>
  );
}

export default App;