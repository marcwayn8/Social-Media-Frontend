import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';

function SeverityMeterComponent() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerGroup, setMarkerGroup] = useState(null);
  const [complaint, setComplaint] = useState({
    title: '',
    description: '',
    zipCode: '',
    severity: 'low',
    userId: '',
  });
  const [user, setUser] = useState('');
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    initMap();
    getCurrentUser();
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

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setComplaint({
      ...complaint,
      [name]: value,
    });
  }

  // function getCurrentUser() {
  //   axios.get('http://localhost:4005/users')
  //     .then(response => {
  //       const currentUser = response.data;
  //       setUser(currentUser);
  //     })
  //     .catch(error => {
  //       console.error(`Error getting current user: ${error}`);
  //     });
  // }

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

  function getCurrentUser() {
    axios.get('http://localhost:4005/users')
      .then(response => {
        const currentUser = response.data;
        setUser(currentUser);
      })
      .catch(error => {
        console.error(`Error getting current user: ${error}`);
      });
  }

  getCurrentUser();

return (
    <div className="severity-meter-component">
      <div className="user-profile">
        <div className="welcome-message">Welcome,</div>
        <img src="https://via.placeholder.com/50x50" alt="User profile image" />
      </div>
      <div ref={mapRef} className="map"></div>
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

export default SeverityMeterComponent;