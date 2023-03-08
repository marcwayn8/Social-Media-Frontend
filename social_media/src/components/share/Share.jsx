import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import ImageUploading from "react-images-uploading";
import AppContext from "../../context/appContext";
import "./share.css";
import logo from './img.jpg';

export default function Share() {
  const { user, setPosts, posts, feedMetric, setFeedMetric } = useContext(AppContext);
 
  const [type, setType] = useState([]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");

  async function createPost(e) {
    e.preventDefault();
    if (input === "") return;
    if (type === "") return;
    if (title === "") return;
 

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

console.log(parsed);

    setPosts([parsed.data[0], ...posts]);
    const map = { ...feedMetric };
    map[parsed.data[0].postId] = [0, 0];
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
            src={logo}
            alt="Profile Pic"
          />
          <div>
          <input
            value={title}
            placeholder={`Report Instances of noise pollution ${user.username}?`}
            className="shareInput"
            onChange={handleTitleChange}
          /></div>
          <div> <input
            value={type}
          
            className="shareInput"
            onChange={handleTypeChange}
          /></div>
           <div><input
            value={input}
        
            className="shareInput"
            onChange={handleInputChange}
          /></div>
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
