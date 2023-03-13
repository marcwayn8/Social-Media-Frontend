import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Feed from "../../components/feed/Feed.jsx";

import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppContext from "../../context/appContext.jsx";
import "./home.css";
import React from 'react';


export default function Home() {
  const { user, setUser, setPosts, isAuth, theme } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:4005/post")
      .then((response) => response.json())
      .then((data) => {setPosts(data)})
;
  }, []);

  return !isAuth ? <Navigate to="/login"/> : (
    <div id={theme}>
      <Topbar />
      <div className="homeContainer">
        <Sidebar/>
        <Feed id={theme}/>
    
      </div>
    </div>
  );
}
