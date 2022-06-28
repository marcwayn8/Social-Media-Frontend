import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import ImageUploading from "react-images-uploading";
import AppContext from "../../context/appContext";
import { FiSend } from "react-icons/fi";
import "./share.css";

export default function Share(props) {
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

  const handleImage = async (e) => {
    e.preventDefault();
    setImage(images[0].data_url);
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

  const handleHashtagClick = (e) => {
    setHashtag(e.target.value);
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
              {/* <PermMedia htmlColor="tomato" className="shareIcon" /> */}
              {/* <IconButton aria-label="delete">
                <PhotoCameraIcon htmlColor="#2e7865" className="shareIcon" />
              </IconButton> */}
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
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper d-flex">
                      <button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                        className="me-1 btn mt-2 upload-button"
                      >
                        <PhotoCameraIcon
                          htmlColor="whitesmoke"
                          className="shareIcon"
                        />
                        Upload
                      </button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item d-flex mt-2">
                          <p className="mx-1 mt-2">{image.file.name}</p>
                          {/* <img src="" alt={image.file.name} width="100" /> */}
                          <div className="image-item__btn-wrapper">
                            <button
                              className="mx-1 btn btn-danger"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </button>
                            {/* <button className="mx-1 btn btn-primary" type="submit" onClick={handleImage}>
                              Confirm
                            </button> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>
            {/* <div className="shareOption">
              <div className="dropdown">
                <IconButton aria-label="delete">
                  <TagIcon htmlColor="#2e7865" className="shareIcon" />
                </IconButton>
                <span className="shareOptionText">Tag</span>
                <div className="dropdown-content">
                  <option value="Green" onClick={handleHashtagClick}>
                    Green
                  </option>
                  <option value="Love" onClick={handleHashtagClick}>
                    Love
                  </option>
                  <option value="Hope" onClick={handleHashtagClick}>
                    Hope
                  </option>
                  <option value="Grateful" onClick={handleHashtagClick}>
                    Grateful
                  </option>
                  <option value="Garden" onClick={handleHashtagClick}>
                    Gardens
                  </option>
                </div>
              </div>
            </div> */}
            {/* <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>

          {/* <IconButton aria-label="delete">
              {!isLiked ? (
                <FavoriteBorderTwoToneIcon
                  htmlColor="#343a40"
                  className="likeIcon"
                  onClick={likeHandler}
                />
              ) : (
                <FavoriteIcon
                  htmlColor="#343a40"
                  className="likeIcon"
                  onClick={likeHandler}
                />
              )}
            </IconButton> */}
          <IconButton aria-label="delete" className="addPost">
            <FiSend
              className="shareButton"
              color="#343a40"
              onClick={createPost}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
