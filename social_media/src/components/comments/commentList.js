
import React, { Component, useState, useEffect } from 'react';

export default function CommentList({ postId }) {


  const [data, setData] = useState([])
  const [user, setUser] = useState("")

  useEffect(() => {
    fetch(`http://localhost:4005/comment/${postId}`)
      .then(res => res.json())
      .then(json => setData(json))
  }, []);

  return (
    <ul  >
      {
        data.map(comment => (
          <li className="py-4">
            {comment.commentDescription}
            <br></br>
            - {comment.likes}
          </li>
        ))
      }
    </ul>
  )


}










