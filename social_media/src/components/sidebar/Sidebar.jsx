import { React, useEffect, useState, useContext } from "react";
import "./sidebar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import AppContext from "../../context/appContext";
import { RssFeed, Bookmark, HelpOutline } from "@mui/icons-material";

export default function Sidebar() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:9001/users/${user.user_id}/friends`)
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }, [friends.length]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">About Us</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.length > 0 &&
            friends.map((f) => (
              <CloseFriend
              key={f.user_id}
              friend={f}
              userInfo={user}
              setFriends={setFriends}
              allFriends={friends}
            />
            ))}
        </ul>
      </div>
    </div>
  );
}
