import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/appContext";
import MyPosts from "../myPosts/MyPosts.jsx";
import "./myFeed.css";

export default function MyFeed({ userInfo }) {
  const [allMyPosts, setAllMyPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(AppContext)

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, []);

  useEffect(() => {
    if (!userInfo.user_id) return 
    fetch(`http://localhost:9001/posts/${userInfo.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setAllMyPosts(data.data)});
  }, [userInfo.user_id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {allMyPosts && allMyPosts.map((mP) => (
          <MyPosts key={mP.post_id} post={mP} posts={posts} setPosts={setPosts} setAllMyPosts={setAllMyPosts} userInfo={user} allMyPosts={allMyPosts}/>
        ))}
      </div>
    </div>
  );
}
