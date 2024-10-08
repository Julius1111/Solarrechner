import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Line, LineChart } from 'recharts';
import './auswertung.css';
import {useCalculator} from '../CalculatorContext.js'


const Auswertung = () => {
  const { calculatedData } = useCalculator();
  const data = calculatedData; 
  
  try{
    const chartData = data.jahr.map((year, index) => ({
        jahr: year,
        gesErzeugtStrom: data.gesErzeugtStrom[index].toFixed(),
        eigErzeugtStrom: data.eigErzeugtStrom[index].toFixed(),
        Eigenverbrauch: data.eigErtrag[index].toFixed(),
        Einspeisevergütung: data.verErtrag[index].toFixed(),
        gesErtrag: data.gesErtrag[index].toFixed(),
        Überschuss: data.uberschuss[index].toFixed(),
        Betriebskosten: data.gesBetriebsKosten[index].toFixed(),
        PV_überschuss: data.uberschussProJahr[index].toFixed(),
        vergleichRendite: data.vergleichRendite[index].toFixed(),
        ohne_Rendite: data.vergleichRenditeKonto[index].toFixed(),
    }));

    function formatCurrency(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }
    function formatNumber(value) {
      return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 }).format(value);
    }

    const maxWert = Math.max(...data.uberschussProJahr).toFixed();
    const maximum = Math.ceil(maxWert / 500) * 500;
    
    const gesErzeugterstrom = formatNumber(data.gesErzeugterStrom);
    const gesErzeugterstromEig = formatNumber(data.gesErzeugterStromEig);
    const amortisation = formatNumber(data.amortisation)
    const gesKosten = data.gesKosten;
    const gewinn = formatCurrency( data.gewinn.toFixed(2));
    const renditeProJahr = formatNumber(data.renditeProJahr)
    const rendite = formatNumber(data.rendite)
    const gesUberschuss = formatCurrency(data.gesUberschuss.toFixed(2));
    const co2Einsparung = formatNumber(data.co2Einsparung);

    return (
    <div className='auswertung'>
       <div className='centerDiv'>
        <div className='box_shadow_auswertung'>
            <h1>Overview </h1>
            <div className='conteiner_auswertung'>
            <div className='box_auswertung color_pink'>
                <p>Amortisation </p>
                <p>{amortisation} Jahre</p>
            </div>
            
            <div className='box_auswertung color_green'>
              <div className='abstandT'>
                  <p>Gewinn </p>
                  <p>{gewinn}</p>
              </div>
               
              <div className='abstandB'>
                <p>Umsatz</p>
                <p>{gesUberschuss}</p>
              </div>
            </div>
            
            <div className='box_auswertung color_blue'>
              <div className='abstandT'>
                  <p>Rendite pro Jahr </p>
                  <p>{renditeProJahr} %</p>
              </div>
                
              <div className='abstandB'>
                <p>Gesamtrendite </p>
                <p>{rendite} %</p>
              </div>
            </div>
            
            <div className='box_auswertung color_yellow'>
              <div className='abstandT'>
                <p>Erzeugter Stom</p>
                <p>{gesErzeugterstrom} kWh</p>
              </div>

              <div className='abstandB'>
                <p>davon selbst Verbraucht</p>
                <p>{gesErzeugterstromEig} kWh</p>
              </div>
            </div>

            <div className='box_auswertung color_red'>
              <div className='abstandT'>
                <p>CO2 Einsparung</p>
                <p>{co2Einsparung} T</p>
              </div>
            </div>

            </div>
        </div>
        </div>

        <div className='conteiner_diagramme'>
        <h2>Erträge</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jahr" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Eigenverbrauch" stackId="a" fill="#3BB273" />
          <Bar dataKey="Einspeisevergütung" stackId="a" fill="#4D9DE0" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Überschüsse</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          stackOffset="sign"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jahr" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="Überschuss" stackId="a" fill="#7768AE" />
          <Bar dataKey="Betriebskosten" stackId="a" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Amortisation</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jahr" />
          <YAxis domain={[0, maximum]} tickFormatter={formatCurrency} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <ReferenceLine y={gesKosten} stroke="#ff1c09" label={{ position: 'insideTopLeft', value: 'Amortisation ', fill: '#ff1c09' }} />
          <Bar dataKey="PV_überschuss" fill="#4D9DE0" />
          
        </BarChart>
      </ResponsiveContainer>
          
      <h2>Vergleich Renditen</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jahr" />
          <YAxis domain={[0, maximum]} tickFormatter={formatCurrency} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Line type="monotone" dataKey="PV_überschuss" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="vergleichRendite" stroke="#ff1c09" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="ohne_Rendite" stroke="#3BB273" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

        </div>
      </div>
    );
  }
  catch{}
}

export default Auswertung;
