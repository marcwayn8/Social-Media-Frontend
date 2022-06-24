import React from 'react'
import './feed.css'
import Share from '../share/Share.jsx'
import Post from '../post/Post.jsx'
import { Posts } from "../../dummyData";
import { useEffect } from 'react'

export default function Feed(props) {
  
  // useEffect(() => {
  //   fetch("http://localhost:9001/posts")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);
  
  // const posts = props.data.data
  // console.log(posts)
  return (
    <div className='feed'>
      <div className="feedWrapper">
      <Share />
      {Posts.map(p => <Post key={p.id} post={p} />)}
      </div>
    </div>
  )
}
