import React, { useState} from "react";
import InputRadioButton from "../inputRadioButton/inputRadioButton";
import Auswertung from "./auswertung";
import supabase from "../../config/superbaseClient";
import './dropDown.css';
import DynamicTable from "./dynamicTable";

const SwitchAuswertung = () => {
    
    const [selectedIDs, setSelectedIDs]  = useState([]);
    const [ids, setIds] = useState([]);
    const [switchValue, setSwitchValue] = useState('0');
    const [dataIds, setDataIds] = useState([]);
    
   
    // ids von der Datenbank abrufen
    const getAllIds = async () => {
        const { data, errorDb } = await supabase
        .from('Userinput')
        .select('idProjekt');

        if (errorDb) {
        console.log('Fehler beim Abrufen der IDs:', errorDb);
        return;
        }

        if (data) {
            // delet selected ids
            setIds(data.filter((item) => !selectedIDs.includes(item.idProjekt)));
        }
    }    

    const handleSelection = (id) =>{

        // prüfen ob id berreits vorhanden
        if(selectedIDs.includes(id)) return

        // set id to array
        setSelectedIDs((prevArray) => [...prevArray, id]);
        
        // get data from db
        fetchDataPerID(id);

        // delete id from ids (dropdown auswahl)
        setIds((prevArray) => prevArray.filter((item) => item.idProjekt !== id))
    }

    const handleDelet = (id) =>{
        // map through arayy and filter
        setSelectedIDs((prevArray) => prevArray.filter((item) => item !== id));
        setDataIds((prevArray) => prevArray.map(innerArray => innerArray.filter(item => item.idProjekt !== id)));

        setIds((prevArray) => [...prevArray, id])
    }

    const fetchDataPerID = async (id) =>{
        try {
            const { data, error } = await supabase
                .from('CalculadedData') 
                .select('*') 
                .eq('idProjekt', id) 
                .limit(1); 
                

            if (error) {
                throw error; 
            }

             setDataIds((prevItems) => [...prevItems, data]);
             
        } catch (error) {
            console.log(error.message) 
        } 
    };


    
    return (
    <>
        <div className='containerInput containerMargin'>
        
            <p className='customSchrift'>Auswertung</p>

            <div className='rechner_input'>
                <p>Wähle eine Auswertungsform</p>
                <InputRadioButton value={switchValue} setValue={setSwitchValue} name1={'Dieses Projekt'} name2={'Vergleich von Projekten'} id={'Auswertung'}/>
            </div>

            {switchValue === '1' &&
            <div className='rechner_input'>
                <p>Wähle Projekte zum vergleichen</p>

                <div className="containerDropdown">
                <div class="dropdown">
    
                    <button class="dropbtn marginNull" onMouseEnter={getAllIds} onClick={getAllIds}>Projekt</button>
                
                    <div class="dropdown-content">
                        {ids.map((item, index) => (
                            <p key={index} onClick={() => handleSelection(item.idProjekt)} >{item.idProjekt} </p>  
                        ))}
                    </div>    
                </div>

                <div className="containerSelection">
                    {selectedIDs.map((item, index) => (
                        <div key={index} className="selectionElement">
                            <p>{item}</p>
                            <svg onClick={() => handleDelet(item)} x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"> <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg>
                        </div>
                    ))}
                 </div>
                 </div>
            </div>
            }
        </div>

        {switchValue === '0' &&
            <Auswertung/>
        }

        {switchValue === '1' &&
          <DynamicTable rawData={dataIds}></DynamicTable> 
        }

    </>
    
    );
}

export default SwitchAuswertung;
  