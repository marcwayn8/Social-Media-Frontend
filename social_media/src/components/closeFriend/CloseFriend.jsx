import IconButton from "@mui/material/IconButton";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ friend, userInfo }) {
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
      <div className="fr-list">
        <Link className="friendLinks" to={`/profile/${friend.user_id}`}>
          <img className="sidebarFriendImg" src={friend.profile_pic} alt="" />
          <span className="sidebarFriendName">{friend.username}</span>{" "}
        </Link>
      </div>
      <Link className="message-icon" to={`/chat/${friend.user_id}`}>
        <div className="message-icon">
          <IconButton aria-label="delete">
            <BsFillChatLeftDotsFill
              className="message-icon"
              fontSize=".85em"
            />
          </IconButton>
        </div>
      </Link>
    </li>
  );
}
