import React, { useState, useRef, useImperativeHandle, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './locationInput.css';
import L from 'leaflet';
import { useCalculator } from '../../CalculatorContext.js';

import  getPVGISData  from '../../PVGIS.jsx';

const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
const center = [51.505, -0.09];


const DraggableMarker = React.forwardRef(({ setPosition }, ref) => {
    const [draggable, setDraggable] = useState(true);
    const map = useMap();
    const markerRef = useRef();

    // toggle Dragable per click
    const handelClick = (event) => {
        if(draggable) 
        {
            setDraggable(false)
        }
        else {
            setDraggable(true)
            // set direcly after Click not after moving the mouse
            const latLong = map.mouseEventToLatLng(event.originalEvent); // Umwandlung von Pixelposition zu LatLng
            if(latLong)
            {
                markerRef.current.setLatLng(latLong)
                setPosition([latLong.lat, latLong.lng])
            }; 
        }
    }
    // detect click on map
    useMapEvent('click', handelClick);

    // set marker position
    useEffect(() => {
        const handleMouseMove = (event) => {
            if(draggable)
            {
                const latLong = map.mouseEventToLatLng(event.originalEvent); // Umwandlung von Pixelposition zu LatLng
                if(latLong)
                {  
                    markerRef.current.setLatLng(latLong)
                    setPosition([latLong.lat, latLong.lng])
                }; 
            }
        };

        // eventlisteners hinzufügen
        map.on('mousemove', handleMouseMove);

        // Cleanup: Event-Listener entfernen, wenn der Effekt aufgehoben wird
        return () => {
        map.off('mousemove', handleMouseMove);
 
        };
    }, [map, draggable]);

    // Api für Parent zugriff
    useImperativeHandle(ref, () => ({
        changeView:  (latLong) =>{  
            setDraggable(false); 
            map.setView(latLong);
            markerRef.current.setLatLng(latLong)
        }
    }));
    
    return (
        <Marker position={center} icon={defaultIcon} ref={markerRef}/>
    );
})



const LocationInput = React.forwardRef(({}, ref) => {

    const markerRef = useRef();
    const {markerPosition, setMarkerPosition} = useCalculator();

    const setMarkerViewLocation = (latitude, longitude) => {
        setMarkerPosition([latitude, longitude])
        
        // Child funktion aufrufen --> view auf markerposition setzen
        if (markerRef.current) {
            markerRef.current.changeView([latitude, longitude]);
        }
    }


    const getCurrentPosition = () =>{
        

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
          } else {
            alert("Geolocation not supported");
          }
          
          function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setMarkerViewLocation(latitude, longitude);
          }
          
          function error() {
            alert("Unable to retrieve your location");
          }
    }

    // Api für Parent zugriff
    useImperativeHandle(ref, () => ({
        changePosition:  (latitude, longitude) =>{  
            setMarkerViewLocation(latitude, longitude);
        }
    }));

    return (
        <div className='map_container'>

             <p className='customSchrift'>Position</p>

            <MapContainer id="mapContaienr" center={center} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <DraggableMarker ref={markerRef} position={markerPosition} setPosition={setMarkerPosition}/>

            </MapContainer>

            <div className='map_container-other'>
                <div className='map_container-latlong'>
                    <p>Breitengrad: {markerPosition[0].toFixed(4)} </p>
                    <p>Längengrad: {markerPosition[1].toFixed(4)}</p>
                </div>

                <div className='map_container-button'>
                    <button className='customButton' onClick={getCurrentPosition}>Aktuelle Position nutzen</button>
                </div>

            </div>
        </div>
    );
});

export default LocationInput;
