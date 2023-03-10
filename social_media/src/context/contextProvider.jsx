import { React, useState, useEffect } from "react";
import AppContext from "./appContext";

const ContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [feed, setFeed] = useState([]);
  const [feedMetric, setFeedMetric] = useState({});
  const [theme, setTheme] = useState("dark");
  const [searchTerm,setSearchTerm] = useState("");


  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    async function getFeed() {
      const res = await fetch("http://localhost:4005/post");
      const data = await res.json();

      setFeed(data);
      setPosts(data)
    }

    async function getLikeCountAndCommentCount() {
      const map = {};
      const commentRes = await fetch("http://localhost:4005/comment");
      const commentData = await commentRes.json();
      for (let comment of commentData) {
        map[comment.post_id] = [parseInt(comment.likes), 0];
      }
      console.log(commentData)
      const likeRes = await fetch("http://localhost:4005/post");
      const likeData = await likeRes.json();
      console.log(likeData)
      // for (let like of likeData) {
      //   if (like.post_id in map) {
      //     map[like.post_id][1] = parseInt(like.likecount);
      //   } else {
      //     map[like.post_id] = [0, parseInt(like.likecount)];
      //   }
      // }
      setFeedMetric(map);
    }

    getFeed();
    getLikeCountAndCommentCount();
  }, []);

  useEffect(() => {


  
    const userToken = window.localStorage.getItem("token");
    if (!userToken) return;

    async function checkAuth() {
      const response = await fetch("http://localhost:4005/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToken),
      });

      const data = await response.json();
      if (data.isAuth) {
        setIsAuth(true);
      }
      const us = window.localStorage.getItem("currUser");
      const parsed = JSON.parse(us);
      setUser(parsed);
    }
    checkAuth();
  }, []);

  const context = {
    user,
    setUser,
    posts,
    setPosts,
    isAuth,
    setIsAuth,
    feed,
    setFeed,
    feedMetric,
    setFeedMetric,
    theme,
    toggleTheme,
    searchTerm,
    setSearchTerm
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;