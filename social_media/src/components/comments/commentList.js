
import React, { Component, useState, useEffect } from 'react';

export default function CommentList({ postId }) {


  const [data, setData] = useState([])


  useEffect(() => {
    fetch(`http://localhost:4005/comment/${postId}`)
      .then(res => res.json())
      .then(json => console.log(json))
  }, []);


  console.log(data)
  return (
    <ul  >
      {
          <li className="py-4">
          hi
            <br></br>
            - 
          </li>
      }
    </ul>
  )
}










