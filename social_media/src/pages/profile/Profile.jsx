import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyFeed from "../../components/myFeed/MyFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();


  const loggedInUser = window.localStorage.getItem('currUser');

  console.log(loggedInUser);


  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:4005/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUserInfo(data));
  }, [id]);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                // src={userInfo.cover_pic}
                alt=""
              />
              <img
                className="profileUserImg"
                src='./img.jpg'
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userInfo.username}</h4>
              <span className="profileInfoDesc"></span>
            </div>
          </div>
          <div className="profileRightBottom">
            <MyFeed userInfo={userInfo} />
            <Rightbar profile userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
