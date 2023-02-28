import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppContext from "./context/appContext";
import Chat from "./pages/chats/Chats.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Signup from "./pages/signup/Signup.jsx";
import SeverityMeterComponent from "./components/complaint form/complaint";
import MarketLandingPage from "./pages/landing/marketing/MarketLandingPage.jsx";



function App() {
  const { isAuth } = useContext(AppContext);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<MarketLandingPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<SeverityMeterComponent />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
