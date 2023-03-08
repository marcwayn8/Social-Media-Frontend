
import React, { Component, useState, useEffect } from 'react';

export default function CommentList({ postId }) {


  const [data, setData] = useState([])
  const [user, setUser] = useState("")

  useEffect(() => {
    fetch(`http://localhost:4005/comment/${postId}`)
      .then(res => res.json())
      .then(json => setData(json))
  }, []);


  console.log(data)
  return (
    <ul  >
      {
          <li className="py-4">
            {data.commentDescription}
            <br></br>
            - {data.likes}
          </li>
      }
    </ul>
  )
}










