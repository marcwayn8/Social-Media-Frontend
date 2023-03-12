import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { DateTime } from "luxon";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/appContext.jsx";
import Comments from "../comments/Comments.jsx";
import CommentModal from "../comments/commentModal.js";
import CommentDropDown from "../comments/commentDropdown.js";
import "./post.css";
import img from './img.jpg'
import React from 'react';

export default function Post({ key,post, setPosts, userInfo }) {
  const { posts, feedMetric, setFeedMetric, user } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [current,setCurrent] = useState("")

console.log(post)
console.log(post.postId)

async function getUser(){
    const res = await fetch(`http://localhost:4005/users/${post.user_id}`);
    const data = await res.json();
    console.log(data)
    setCurrent(data.username);}
   
    getUser()

  const handleDelete = async (e) => {
    try {
      await fetch(`http://localhost:4005/post/${post.postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filtered = posts.filter((p) => p.postId !== post.postId);
      setPosts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
     
      user_id: userInfo.id,
      postId: post.postId,
      commentDescription: reply
    };

    const result = await fetch(
      `http://localhost:4005/post/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const parsed = await result.json();
    parsed.data[0].username = userInfo.username;
    // parsed.data[0].profile_pic = userInfo.profile_pic;
    setComments([...comments, parsed.data[0]]);
    const map = { ...feedMetric };
    map[post.post_id][0] += 1;
    setFeedMetric(map);
    setReply("");
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.id}`}>
              <img className="postProfileImg" id="logo" src={img} alt="" />
            </Link>
            <span className="postUsername">{current}</span>
            <span className="postDate">
              {DateTime.fromISO().toRelative()}
            </span>
          </div>
          <div className="postTopRight">
            {post.user_id = userInfo.id && (
              <IconButton aria-label="delete">
                <DeleteIcon
                  className="delete-comment"
                  type="submit"
                  onClick={handleDelete}
                />
              </IconButton>
            )}
          </div>
        </div>
        <div className="postCenter">
         
          <h2 >{post.post_title}  </h2>
         <center><h3>{post.post_type} </h3> </center> 
         
         <span className="postText">{post.post_description}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <IconButton aria-label="delete">
              {!isLiked ? (
                <FavoriteBorderTwoToneIcon
                  className="likeIcon" 
                />
              ) : (
                <FavoriteIcon
                  className="likeIcon" 
                />
              )}
            </IconButton>
            <span className="postLikeCounter">
              {feedMetric[post.postId] && feedMetric[post.postId][1] > 1 && (
                <span className="postLikeCounter">
                  {feedMetric[post.postId]} Likes
                </span>
              )}
              {feedMetric[post.postId] &&
                feedMetric[post.postId][1] === 0 && (
                  <span className="postLikeCounter">0 Likes</span>
                )}
              {feedMetric[post.postId] &&
                feedMetric[post.postId][1] === 1 && (
                  <span className="postLikeCounter">1 Like</span>
                )}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" >
              {feedMetric[post.postId] && feedMetric[post.postId][0] > 0 && (
                <span className="postCommentText">
                  {feedMetric[post.postId][0]} Comments
                </span>
              )}
              {feedMetric[post.postId] &&
                feedMetric[post.postId][0] === 0 && (
                  <span className="postCommentText">
             <centre><span className="inline-flex items-center text-sm" >
                              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <CommentModal className="h-5 w-5" aria-hidden="true" postId={post.postId}/>
                                <span className="font-medium text-gray-900"></span>
                                <span className="sr-only">likes{post.likes}</span>
                              </button>
                            </span></centre>
                            <span className="inline-flex items-center text-sm">
           
                              <CommentDropDown  postId={post.postId} className="h-5 w-5" aria-hidden="true" />
                            </span>
                  </span>
                )}
            </span>
          </div>
        </div>
        {showComment && (
          <>
            <form onSubmit={handleSubmit}>
              {comments.map((c) => (
                <Comments
                  key={c.comment_id}
                  allComments={c}
                  aComment={comments}
                  setComments={setComments}
                  post={post}
                />
              ))}
              <div className="commenting">
                <input
                  className="comment-on-post"
                  value={reply}
                  placeholder="Comment..."
                  onChange={(e) => setReply(e.target.value)}
                ></input>
                <Button
                  className="send"
                  type="submit"
                  variant="outlined"
                  color="info"
                  size="small"
                >
                  Comment
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
