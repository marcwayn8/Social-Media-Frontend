import { React, useContext, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./home.css";
import AppContext from "../../context/appContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const { user, setUser, setPosts, isAuth } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, []);

  return !isAuth ? <Navigate to="/login"/> : (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
