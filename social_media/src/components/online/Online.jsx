import { Link } from "react-router-dom";
import { useContext } from "react";
import "./online.css";
import AppContext from "../../context/appContext";

export default function Online({ }) {
  const { posts, feedMetric, setFeedMetric, user } = useContext(AppContext);
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        {/* <Link to={`/chats/${user.user_id}`}> */}
        <Link to={'/profile'}>

        {/* </Link> */}
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
