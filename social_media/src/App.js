
import { Route, Routes } from "react-router-dom";
import './index.css'

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Signup from "./pages/signup/Signup.jsx";
import SeverityMeterComponent from "./components/complaint form/complaint";
import * as React from "react"

import LandingPage from "./pages/landingPage/landingPage";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<SeverityMeterComponent />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
