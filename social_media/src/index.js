import ReactDOM from 'react-dom/client';
import react from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import ContextProvider from "./context/contextProvider";
import './index.css';
import React from 'React';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>
);