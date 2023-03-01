import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/appContext";
import MyPosts from "../myPosts/MyPosts.jsx";
import "./myFeed.css";

export default function MyFeed({ userInfo }) {
const { user } = useContext(AppContext);
const [allMyPosts, setAllMyPosts] = useState([]);
const [posts, setPosts] = useState([]);

useEffect(() => {
const fetchAllPosts = async () => {
const response = await fetch("http://localhost:4005/post");
const data = await response.json();
setPosts(data);
};
fetchAllPosts();
}, []);

useEffect(() => {
if (!user.id) return;
const fetchUserPosts = async () => {

  const response = await fetch(`http://localhost:4005/post/${user.id}`);

const data = await response.json();
setAllMyPosts(data.data);
};
fetchUserPosts();
}, [user.id]);

return (
<div className="feed">
<div className="feedWrapper">
{allMyPosts.map((post) => (
<MyPosts
         key={post.postId}
         post={post}
         posts={posts}
         setPosts={setPosts}
         setAllMyPosts={setAllMyPosts}
         userInfo={user}
         allMyPosts={allMyPosts}
       />
))}
</div>
</div>
);
}