import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Chat from "./pages/chats/Chats.jsx"
import { React, useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AppContext from "./context/appContext";

function App() {
  const { isAuth } = useContext(AppContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route
          path="/login"
          element={
            !isAuth ? (
              <Login />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
