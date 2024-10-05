import React from 'react';
import './dynamicTable.css'

const DynamicTable = ({ rawData }) => {

    function formatCurrency(value) {
        return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);
    }
    function formatNumber(value) {
        return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 }).format(value);
    }
    // clean up data to display in table
    const data = rawData.flatMap(projects => 
        projects.map(project => ({
          idProjekt: project.idProjekt,
          amortisation: formatNumber(project.amortisation),
          co2Einsparung: formatNumber(project.co2Einsparung),
          gesErtragEig: formatNumber(project.gesErtragEig),
          rendite: formatNumber(project.rendite),
          renditeProJahr: formatNumber(project.renditeProJahr),
          gesErzeugterStrom: formatNumber(project.gesErzeugterStrom),
          gesErzeugterStromEig: formatNumber(project.gesErzeugterStromEig),
          gewinn: formatCurrency(project.gewinn),
          umsatz: formatCurrency(project.gesUberschuss),
        }))
    );

    return (
        <div className='containerInput containerMargin'>
            <div className='rechner_input table_container'>
                <h2>Vergleich</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th className='firstRow'>Merkmal</th>
                            {data.map((row, index) => (
                                <th key={`${row.idProjekt}-${index}`}>{row.idProjekt}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='firstRow'>Amortisation in Jahren</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.amortisation}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className='firstRow'>Gewinn in €</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.gewinn}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className='firstRow'>Umsatz in €</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.umsatz}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className='firstRow'>Rendite in %</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.rendite}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className='firstRow'>Rendite pro Jahr in %</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.renditeProJahr}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className='firstRow'>Erzeugter Strom in kWh</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.gesErzeugterStrom}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className='firstRow'>Davon selbst verbraucht in kWh</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.gesErzeugterStromEig}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className='firstRow'>CO2 Einsparung in T</td>
                            {data.map((row, index) => (
                                <td key={`${row.idProjekt}-${index}`}>{row.co2Einsparung}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DynamicTable;