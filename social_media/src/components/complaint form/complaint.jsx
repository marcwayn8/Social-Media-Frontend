import React, { useState, useRef, useEffect ,Fragment} from 'react';
import axios from 'axios';
import L from 'leaflet';
import { useContext } from 'react';
import AppContext from '../../context/appContext'
import logo from './img.jpg'
import Topbar from "../../components/topbar/Topbar.jsx";



export default function SeverityMeterComponent() {

  const {  user } = useContext(AppContext);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerGroup, setMarkerGroup] = useState(null);
  const [complaint, setComplaint] = useState({
    title: '',
    description: '',
    zipCode: '',
    severity: 'low',
    userId: user.id
  });

  const [complaints, setComplaints] = useState([]);


  useEffect(() => {
    initMap();

    fetchLatestComplaints();
  }, []);

  function initMap() {
    const map = L.map(mapRef.current).setView([40.7128, -74.0060], 5);
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
          const marker = L.marker([lat, lon]).addTo(markerGroup);
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
  
  function fetchLatestComplaints() {
    axios.get('http://localhost:4005/complaints')
      .then(response => {
        const latestComplaints = response.data;
        console.log(latestComplaints)
        setComplaints(latestComplaints);
      })
      .catch(error => {
        console.error(`Error getting latest complaints: ${error}`);
      });
  }

  const button = {
    backgroundColor: "transparent",
    height: "30",
    width: "60",
    color: "black",
    fontWeight:"40",
    marginRight: "0",
    borderColor: "transparent"
}

return (
  <div>
  <Topbar/>
    <div className="severity-meter-component">
      <div className="user-profile">
        <div className="welcome-message">Welcome,{user.username}</div>
        <img src={logo} alt="User profile image" />
      </div>
      <div className="map-container">
  <div ref={mapRef} className="map"></div>
</div>


    </div>
    </div>
  );
}
