import React from 'react'
import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      {/* <img className="sidebarFriendImg" src={user.profilePicture} alt="" /> */}
      <img className="sidebarFriendImg" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt=""/>
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}
