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
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [hashtag, setHashtag] = useState("");

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setImage(imageList[0].data_url);
  };

  async function createPost(e) {
    e.preventDefault();
    if (input === "") return;
    if (image === "") setImage("");

    const postInfo = {
      hashtag: hashtag,
      image: "",
      description: input,
      user_id: user.user_id,
      username: user.username,
      upload: image,
    };

    const result = await fetch("http://localhost:9001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInfo),
    });
    const parsed = await result.json();
    parsed.data[0].username = user.username;
    parsed.data[0].profile_pic = user.profile_pic;
    setPosts([parsed.data[0], ...posts]);
    const map = { ...feedMetric };
    map[parsed.data[0].post_id] = [0, 0];
    setFeedMetric(map);
    setInput("");
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profile_pic}
            alt="Profile Pic"
          />
          <input
            value={input}
            placeholder={`What's on your mind ${user.username}?`}
            className="shareInput"
            onChange={handleInputChange}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <div>
                <ImageUploading
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <div className="upload__image-wrapper d-flex">
                      <button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                        className="me-1 btn mt-2 upload-button"
                      >
                        <BiImageAdd
                          htmlColor="whitesmoke"
                          className="shareIcon"
                        />
                        Upload
                      </button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item d-flex mt-2">
                          <p className="mx-1 mt-2">{image.file.name}</p>
                          <div className="image-item__btn-wrapper">
                            <button
                              className="mx-1 btn btn-danger"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
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
