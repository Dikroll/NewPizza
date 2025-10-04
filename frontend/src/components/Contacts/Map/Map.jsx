import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import markerIcon from '@/assets/images/favicon.svg';


const Map = () => {
  const customIcon = new L.DivIcon({
    className: 'custom-icon', 
    html: `<img src="${markerIcon}" alt="marker" style="width: 32px; height: 32px;" />`, 
    iconSize: [64, 64], 
    iconAnchor: [15, 15], 
    popupAnchor: [0, -32], 
  });

  
  const position = [57.00540697486016, 40.984307514154686]; 

  return (
    <MapContainer
      center={position} 
      zoom={15} 
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
  attribution='Map tiles by <a href="https://carto.com/attributions">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL.'
/>
      <Marker position={position} icon={customIcon}>
        <Popup>Ул. 8 марта, д. 32Б, Иваново</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
