import { Bookmark, HelpOutline, RssFeed } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/appContext";
import CloseFriend from "../closeFriend/CloseFriend";
import "./sidebar.css";

export default function Sidebar() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:9001/users/${user.user_id}/friends`)
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link className="sideBarLinks" to={'/'}>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          </Link>
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
