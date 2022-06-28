import React from "react";
import "./closeFriend.css";
import RemoveIcon from "@mui/icons-material/Remove";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

export default function CloseFriend({
  friend,
  userInfo,
  setFriends,
  allFriends,
}) {
  const removeFriend = async (e) => {
    try {
      const data = {
        user_id: userInfo.user_id,
        friend_two: friend.user_id,
      };
      await fetch(`http://localhost:9001/users/${userInfo.user_id}/friends`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="sidebarFriend">
      <div>
        <Link className="friendLinks" to={`/profile/${friend.user_id}`}>
          <img className="sidebarFriendImg" src={friend.profile_pic} alt=""/>
          <span className="sidebarFriendName">{friend.username}</span>{" "}
        </Link>
      </div>
      <Link className="message-icon" to={`/chat/${friend.user_id}`}>
        <div className="message-icon">
          <IconButton aria-label="delete">
            <BsFillChatLeftDotsFill
              className="message-icon"
              color="#343a40"
              fontSize=".85em"
            />
          </IconButton>
        </div>
      </Link>
    </li>
  );
}
