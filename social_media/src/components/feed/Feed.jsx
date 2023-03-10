import { useContext ,useState} from "react";
import AppContext from "../../context/appContext";
import Post from "../post/Post.jsx";
import Share from "../share/Share.jsx";
import "./feed.css";

export default function Feed({ userInfo }) {
  const { user, setPosts, posts,searchTerm } = useContext(AppContext);


  // {posts.filter(val=> val.post_type.includes(searchTerm)).map(p => 

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share post={posts} setPosts={setPosts} userInfo={user}/>
        {posts.map(p => 
          <Post key={p.postId} post={p} posts={posts} setPosts={setPosts} userInfo={user} />
                )}
      </div>
    </div>
  );
}