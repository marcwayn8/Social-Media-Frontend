import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import ImageUploading from "react-images-uploading";
import AppContext from "../../context/appContext";
import "./share.css";

export default function Share() {
  const { user, setPosts, posts, feedMetric, setFeedMetric } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [type, setType] = useState([]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");

  const maxNumber = 69;
  

  async function createPost(e) {
    e.preventDefault();
    if (input === "") return;
    if (image === "") setImage("");

    const postInfo = {
      user_id: user.id,
      post_description: input,
      post_title:title,
      post_type:type 
    };

    const result = await fetch("http://localhost:4005/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInfo),
    });
    const parsed = await result.json();
    parsed.data[0].username = user.username;

    setPosts([parsed.data[0], ...posts]);
    const map = { ...feedMetric };
    map[parsed.data[0].post_id] = [0, 0];
    setFeedMetric(map);
    setInput("");
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            // src={user.profile_pic}
            alt="Profile Pic"
          />
          <input
            value={title}
            placeholder={`What's on your mind ${user.username}?`}
            className="shareInput"
            onChange={handleTitleChange}
          />
           <input
            value={type}
          
            className="shareInput"
            onChange={handleTypeChange}
          />
           <input
            value={input}
        
            className="shareInput"
            onChange={handleInputChange}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <div>
               
              </div>
            </div>
          </div>
          <IconButton aria-label="delete" className="addPost">
            <IoMdSend
              className="shareButton"
              onClick={createPost}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
