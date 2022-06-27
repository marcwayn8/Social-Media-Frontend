import "./online.css";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Online({ user }) {

  const handleProfilePicClick = (e) => {
    console.log(user.user_id)
  }

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        {/* <Link to={`/chats/${user.user_id}`}> */}
        <Link to={'/profile'}>
        <img className="rightbarProfileImg" src={user.profile_pic} alt="" onClick={handleProfilePicClick}/>
        {/* </Link> */}
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
