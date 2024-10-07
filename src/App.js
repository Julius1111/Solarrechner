import './App.css';
import React from 'react';
import { CalculatorProvider } from './Components/CalculatorContext.js';
import Berechnung from './Components/Berechnungen.js';
import Auth from './Components/auth/auth.jsx';
import ProtectedRoute from './Components/auth/ProtectedRoute.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInput from './Components/userInput/userInput.jsx'
import SwitchAuswertung from './Components/Auswertung/switchAusertung.jsx';


function AppContent() {

  return (
    <Router>
      <div className="App">
      
        <Berechnung/>

        <Routes>
          <Route path="/" element={<Auth/>}> </Route>
          
          <Route path="/rechner" element={
            <ProtectedRoute>
              <UserInput/>
              <SwitchAuswertung/>
            </ProtectedRoute>}> 
          </Route>
            
        </Routes>

      </div>
    </Router>

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