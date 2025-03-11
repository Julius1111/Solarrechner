import supabase from '../config/superbaseClient.js';



async function getPVGISData(latitude, longditude, peakPower, sytemLoss, angel, aspect, lifetime ) {
    const { data, error } = await supabase.functions.invoke('getPVGISData', {
      method: 'POST', 
      body: { 
        "lat": latitude,
        "lon": longditude,
        "peakpower": peakPower,
        "loss": sytemLoss,
        "angle": angel,
        "aspect": aspect,
        "lifetime": lifetime
      },
    })
    
    if (error) {
      console.error('Fehler beim Aufrufen der Edge-Funktion:', error)
      return
    }
    
    
    // Stromertrag auswählen aus dem objekt
    const stromErtag = data.outputs.totals.fixed.E_y; 


    return stromErtag;
  }


  export default getPVGISData