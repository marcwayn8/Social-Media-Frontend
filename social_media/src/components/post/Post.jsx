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
import "./post.css";

export default function Post({ post, setPosts, userInfo }) {
  const { posts, feedMetric, setFeedMetric, user } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [showComment, setShowComment] = useState(false);

  const handleComments = async (e) => {
    setShowComment(!showComment);
    await fetch(`http://localhost:9001/posts/${post.post_id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.data);
      });
  };

  const likeHandler = async () => {
    if (!isLiked) {
      feedMetric[post.post_id][1] += 1;
      await fetch(`http://localhost:9001/posts/${post.post_id}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });
    } else {
      feedMetric[post.post_id][1] -= 1;
      await fetch(`http://localhost:9001/posts/${post.post_id}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });
    }
    setIsLiked(!isLiked);
  };

  const handleDelete = async (e) => {
    try {
      await fetch(`http://localhost:9001/posts/${post.post_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filtered = posts.filter((p) => p.post_id != post.post_id);
      setPosts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      comment_body: reply,
      user_id: userInfo.user_id,
      post_id: post.post_id,
    };

    const result = await fetch(
      `http://localhost:9001/posts/${post.post_id}/comments`,
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
    parsed.data[0].profile_pic = userInfo.profile_pic;
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
            <Link to={`/profile/${post.user_id}`}>
              <img className="postProfileImg" src={post.profile_pic} alt="" />
            </Link>
            <span className="postUsername">{post.username}</span>
            <span className="postDate">
              {DateTime.fromISO(post.time_posted).toRelative()}
            </span>
          </div>
          <div className="postTopRight">
            {post.user_id === userInfo.user_id && (
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
          <span className="postText">{post.description}</span>
          <img className="postImg" src={post.upload} alt="" />
          <img className="postImg" src={post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <IconButton aria-label="delete">
              {!isLiked ? (
                <FavoriteBorderTwoToneIcon
                  className="likeIcon"
                  onClick={likeHandler}
                />
              ) : (
                <FavoriteIcon
                  className="likeIcon"
                  onClick={likeHandler}
                />
              )}
            </IconButton>
            <span className="postLikeCounter">
              {feedMetric[post.post_id] && feedMetric[post.post_id][1] > 1 && (
                <span className="postLikeCounter">
                  {feedMetric[post.post_id][1]} Likes
                </span>
              )}
              {feedMetric[post.post_id] &&
                feedMetric[post.post_id][1] === 0 && (
                  <span className="postLikeCounter">0 Likes</span>
                )}
              {feedMetric[post.post_id] &&
                feedMetric[post.post_id][1] === 1 && (
                  <span className="postLikeCounter">1 Like</span>
                )}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleComments}>
              {feedMetric[post.post_id] && feedMetric[post.post_id][0] > 0 && (
                <span className="postCommentText">
                  {feedMetric[post.post_id][0]} Comments
                </span>
              )}
              {feedMetric[post.post_id] &&
                feedMetric[post.post_id][0] === 0 && (
                  <span className="postCommentText">
                    Be the first to comment
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
