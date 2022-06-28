import { useContext } from "react";
import AppContext from "../../context/appContext";
import Post from "../post/Post.jsx";
import Share from "../share/Share.jsx";
import "./feed.css";

export default function Feed({ userInfo }) {
  const { user, setPosts, posts } = useContext(AppContext);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share post={posts} setPosts={setPosts} userInfo={user}/>
        {posts.map((p) => (
          <Post key={p.post_id} post={p} posts={posts} setPosts={setPosts} userInfo={user} />
        ))}
      </div>
    </div>
  );
}