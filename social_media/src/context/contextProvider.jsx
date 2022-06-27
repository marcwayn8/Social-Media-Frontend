import { React, useState, useEffect } from "react";
import AppContext from "./appContext";

const ContextProvider = (props) => {
const [user, setUser] = useState({});
const [posts, setPosts] = useState([]);
const [isAuth, setIsAuth] = useState(false);

useEffect(() => {
  const userToken = window.localStorage.getItem("token");
  if (!userToken) return;

  async function checkAuth() {
    const response = await fetch('http://localhost:9001/authenticate', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userToken})
    })
    
    const data = await response.json();
    if (data.isAuth) {
      setIsAuth(true);
    }
    const us = window.localStorage.getItem('currUser');
    const parsed = JSON.parse(us);
    setUser(parsed);
  }
  checkAuth();
}, [])

useEffect(() => {
  fetch('http://localhost:9001/posts')
  .then((response) => response.json())
  .then((data) => setPosts(data.data));
}, []);

const context = {
    user,
    setUser,
    posts,
    setPosts,
    isAuth,
    setIsAuth
}

  return (
    <AppContext.Provider value={context}>
        {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider
