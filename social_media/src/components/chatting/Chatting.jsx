import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./chatting.css";

export default function Chatting({ userInfo }) {
  // const [input, setInput] = useState("");
  // const [chats, setChats] = useState([]);
  // const { id } = useParams();

  // useEffect(() => {
  //   fetch(`http://localhost:9001/users/${userInfo.user_id}/chat/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setChats(data));
  // }, []);

  // if (data.user_id === userInfo.user_id  )

  // console.log(chats);

  // const handleInputChange = (e) => {
  //   setInput(e.target.value);
  // };

  // const handleNewMessage = (e) => {
  //   e.preventDefault();
  //   console.log(input);
  //   setInput("");
  // };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="container d-flex justify-content-center shadow-here">
          <div className="card2 mt-5">
            <div className="d-flex flex-row justify-content-between p-3 adiv text-white">
              <i className="fas fa-chevron-left"></i>
              <span className="pb-3">Live chat</span>
              <i className="fas fa-times"></i>
            </div>
            <div className="d-flex flex-row p-3">
              <img
                className="postProfileImg2"
                src={userInfo.profile_pic}
                alt=""
              />
              <div className="chat ml-2 p-3">
                Hello and thankyou for visiting birdlymind. Please click the
                video above
              </div>
            </div>
            <div className="d-flex flex-row alternate pb-4">
              <div className="chat ml-2 p-3">
                Hello and thankyou for visiting birdlymind. Please click the
                video above
              </div>
              <img
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
                width="30"
                height="30"
              />
            </div>

            <div className="form-group px-3 mt-5">
              <input
                // value={input}
                placeholder="What's on your mind?"
                className="shareInput2"
                type="text"
                // onChange={handleInputChange}
              />
              <button type="submit">
                MESSAGE
              </button>
              {/* <button type="submit" onClick={handleNewMessage}>
                MESSAGE
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
