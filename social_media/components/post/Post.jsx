import React from "react";
import "./post.css";
import { Users } from "../../dummyData";
import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export default function Post({ post }) {
  // console.log(props)
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    !isBookmarked ? setIsBookmarked(true) : setIsBookmarked(false);
    console.log(isBookmarked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              //   src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              src="https://www.northernbeachesreview.com.au/images/transform/v1/crop/frm/jess.wallace/8b0a371c-1e18-4bd5-bf78-0a4aed88cc6f.jpg/r0_0_7359_4906_w1200_h678_fmax.jpg"
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <BookmarkAddOutlinedIcon onClick={handleBookmark} />
          </div>
          <div className="postTopRight">
            <BookmarkAddedIcon onClick={handleBookmark} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
          {/* <img className="postImg" src="https://www.northernbeachesreview.com.au/images/transform/v1/crop/frm/jess.wallace/8b0a371c-1e18-4bd5-bf78-0a4aed88cc6f.jpg/r0_0_7359_4906_w1200_h678_fmax.jpg" alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img
              className="likeIcon"
              src="https://media.istockphoto.com/vectors/red-heart-sign-isolated-on-transparent-background-valentines-day-icon-vector-id1182472970?k=20&m=1182472970&s=612x612&w=0&h=EDa61EAq6_7ABD-KWpIbIRQ4kSCcZyoA_3LJzvtVaXQ="
              onClick={likeHandler}
              alt=""
            /> */}
            {/* <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={likeHandler}
              alt=""
            /> */}
            <FavoriteBorderTwoToneIcon
              htmlColor="#2e7865"
              className="likeIcon"
              onClick={likeHandler}
            />
            <ThumbUpAltIcon
              htmlColor="#2e7865"
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
