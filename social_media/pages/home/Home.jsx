import React from 'react'
import { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Feed from '../../components/feed/Feed.jsx'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import './home.css'

export default function Home() {
  const [postsArray, setPostsArray] = useState([])

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className='leftSideBar'>
        <Sidebar />
        </div>
        <Feed data={postsArray}/>
        <div className='rightSideBar'>
        <Rightbar/>
        </div>
      </div>
    </>
  )
}
