import { React, useContext, useEffect, useState, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import MyFeed from "../../components/myFeed/MyFeed";
import "bootstrap/dist/css/bootstrap.css";

export default function Profile() {
  const [userInfo, setUserInfo, isAuth] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:9001/profile/${id}`)
      .then((response) => response.json())
      .then((data) => setUserInfo(data.data));
  }, [id]);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Topbar/>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={userInfo.cover_pic}
                alt=""
              />
              <img
                className="profileUserImg"
                src={userInfo.profile_pic}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userInfo.username}</h4>
              <span className="profileInfoDesc">{userInfo.about}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <MyFeed userInfo={userInfo} />
            <Rightbar profile userInfo={userInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
