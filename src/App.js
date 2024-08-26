import './App.css';
import React from 'react';
import Rechner from './Components/rechner/rechner.jsx'
import { CalculatorProvider } from './Components/CalculatorContext.js';
import Berechnung from './Components/Berechnungen.js';
import SwitchAuswertung from './Components/Auswertung/switchAusertung.jsx'
import Auth from './Components/auth/auth.jsx';

function AppContent() {
  

  return (
    <div className="App">
      <Auth></Auth>

      <Berechnung/>
      <Rechner />

      <SwitchAuswertung/>
      
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