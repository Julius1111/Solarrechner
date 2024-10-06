import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = ({ rawData }) => {
    try{
    // Überprüfen, ob rawData ein Array ist und eine Länge hat
    if (!Array.isArray(rawData) || rawData.length === 0) {
        console.error("Expected rawData to be a non-empty array, but got:", rawData);
        return null; // Fallback-UI oder leeres Element
    }

    const colorPalette = [
        '#3BB273', '#4D9DE0', '#F18F01', '#E84855', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71', '#F39C12', '#8E44AD'
    ];

    let maxYears = 0;

    // Finde die maximale Anzahl an Jahren in den Projekten
    rawData.forEach(projects => {
        projects.forEach(project => {
            maxYears = Math.max(maxYears, project.jahr.length);
        });
    });

    // Erstelle die Chart-Daten
    const chartData = Array.from({ length: maxYears }, (_, index) => {
        const jahrData = { jahr: index + 1 };

        // Füge Renditen für jedes Projekt hinzu
        rawData.forEach(projects => {
            projects.forEach(project => {
                if (index < project.uberschussProJahr.length) {
                    jahrData[project.idProjekt] = parseFloat(project.uberschussProJahr[index].toFixed(2));
                }
            });
        });

        return jahrData;
    });

    

    function formatCurrency(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }

    return (
        <div className='conteiner_diagramme containerMargin'>
            <h2>Rendite</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
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
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    
                    {Object.keys(chartData[0]).filter(key => key !== 'jahr').map((projectKey, index) => (
                        <Line
                            type="monotone"
                            activeDot={{ r: 8 }}
                            key={projectKey}
                            dataKey={projectKey}
                            stroke={colorPalette[index % colorPalette.length]}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
    }
    catch{}
}

export default Charts;
