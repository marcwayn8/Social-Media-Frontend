import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';

import FavoriteIcon from "@mui/icons-material/Favorite";

import { useContext } from 'react';
import AppContext from '../../context/appContext';
import './complaint.css'
import logo from './img.jpg'


export default function SeverityMeterComponent(){
  const { setUser, setIsAuth, isAuth,user } = useContext(AppContext);
const MapContainer = React.memo(() => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerGroup, setMarkerGroup] = useState(null);
 
  const [complaint, setComplaints] = useState({
    title: '',
    description: '',
    zipCode: '',
    severity: 'low',
    userId: '',
  });

  useEffect(() => {
    initMap();

    fetchLatestComplaints();
  }, []);

  function initMap() {
    const map = L.map(mapRef.current).setView([40.7128, -44.0060], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    setMap(map);
    setMarkerGroup(L.layerGroup().addTo(map));
  }

  function addMarkerAtZipCode(zipCode) {
    axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${zipCode}&country=US&limit=1`)
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;
  
          const redIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });
  
          const marker = L.marker([lat, lon], { icon: redIcon }).addTo(markerGroup);
          marker.bindPopup(`<b>${complaint.title}</b><br>${complaint.description}`).openPopup();
        } else {
          console.error(`Could not find location for zip code ${zipCode}`);
        }
      })
      .catch(error => {
        console.error(`Error getting location for zip code ${zipCode}: ${error}`);
      });
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:4005/complaints', complaint)
      .then(response => {
        const zipCode = complaint.zipCode;
        addMarkerAtZipCode(zipCode);
        fetchLatestComplaints();
      })
      .catch(error => {
        console.error(`Error submitting complaint: ${error}`);
      });
  }

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setComplaints({
      ...complaint,
      [name]: value,
    });
  }

  function fetchLatestComplaints() {
    axios.get('http://localhost:4005/complaints?_sort=id&_order=desc&_limit=3')
      .then(response => {
        const latestComplaints = response.data;
        setComplaints(latestComplaints);
      })
      .catch(error => {
        console.error(`Error getting latest complaints: ${error}`);
      });
  }

return (
    <div className="severity-meter-component">
      <div className="user-profile">
        <div className="welcome-message">Welcome,{user.username}</div>
        <img src={logo} alt="User profile image" />
      </div>
      <div className="map-container">
  <div ref={mapRef} className="map">{MapContainer}</div>
</div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={complaint.title} onChange={handleInputChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={complaint.description} onChange={handleInputChange} className="form-control"></textarea>
        </div>
        <div className="form-group">
  <label>Zip code:</label>
  <input type="text" name="zipCode" value={complaint.zipCode} onChange={handleInputChange} className="form-control" />
</div>

        <div className="form-group">
          <label>Severity:</label>
          <select name="severity" value={complaint.severity} className="form-control">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
)
}
