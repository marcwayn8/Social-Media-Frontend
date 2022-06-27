import { React, useEffect, useContext, useState, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import "./chats.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.css";
import io from "socket.io-client";
import { DateTime } from "luxon";
import AppContext from "../../context/appContext";

const socket = io.connect("http://localhost:9001");

export default function Chat() {
  const { id } = useParams();
  const { user, isAuth } = useContext(AppContext);
  const [receiver, setReceiver] = useState({});
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  
  async function getChatData() {
    const response = await fetch(
      `http://localhost:9001/users/${user.user_id}/chat/${id}`
    );
    const data = await response.json();
    setMessages(data);
  }

  async function getReceiverData() {
    const response = await fetch(`http://localhost:9001/profile/${id}`);
    const data = await response.json();
    setReceiver(data.data);
  }

  useEffect(() => {
    if (!id) return;
    getReceiverData();
    getChatData();
  }, [id]);

  useEffect(() => {
    socket.on("receive_message", (payload) => {
      getChatData();
    });
  }, [socket]);

  function handleChatInput(e) {
    setChatInput(e.target.value);
  }

  function handleChatPost(e) {
    e.preventDefault();
    if (chatInput.length === 0) return;

    async function postChat() {
      const response = await fetch(
        `http://localhost:9001/users/${user.user_id}/chat/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: chatInput }),
        }
      );
      const data = await response.json();
      setMessages([...messages, data[0]]);
    }

    postChat();
    socket.emit("chat", "message");
    setChatInput("");
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={receiver.cover_pic}
                alt=""
              />
              <img
                className="profileUserImg"
                src={receiver.profile_pic}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{receiver.username}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="col-lg-7 col-xl-6">
              <div className="row d-flex justify-content-center chatContainer">
                <div className="card chat2">
                  <div className=" d-flex justify-content-between align-items-center p-3">
                  </div>
                  <div
                    className="card-body"
                    data-mdb-perfect-scrollbar="true"
                    style={{
                      position: "relative",
                      height: "400px",
                      overflowY: "auto",
                    }}
                  >
                    {messages.length > 0 &&
                      messages.map((message) => (
                        <div
                          className={`d-flex flex-row justify-content-${
                            message.sender_id === +user.user_id ? "end" : "start"
                          } mb-4`}
                        >
                          <div>
                            <p
                              className={`small p-2 me-3 mb-1 text-${
                                +message.sender_id === +user.user_id
                                  ? "white"
                                  : "dark"
                              } rounded-3`}
                              style={{
                                backgroundColor:
                                  +message.sender_id === +user.user_id
                                    ? "#3F582E"
                                    : "#e4e6eb",
                              }}
                            >
                              {message.message}
                            </p>
                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                              {DateTime.fromISO(
                                message.created_at
                              ).toRelative()}
                            </p>
                          </div>
                        </div>
                      ))}
                    <div ref={messagesEndRef}></div>
                  </div>
                  <hr></hr>
                  <div className="text-muted p-3">
                    <form onSubmit={handleChatPost}>
                      <div className="post">
                        <textarea
                          className="form-control"
                          placeholder="What's on your mind?"
                          rows="4"
                          value={chatInput}
                          onChange={handleChatInput}
                        ></textarea>
                        <div className="post-options">
                          <button className="btn btn-outline-primary postButton">
                            Post
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
