// import "bootstrap/dist/css/bootstrap.css";
// import { DateTime } from "luxon";
// import { useContext, useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Topbar from "../../components/topbar/Topbar";
// import AppContext from "../../context/appContext";
// import "./chats.css";



// export default function Chat() {
//   const { id } = useParams();
//   const { user, isAuth } = useContext(AppContext);
//   const [receiver, setReceiver] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [chatInput, setChatInput] = useState("");

//   async function getChatData() {
//     const response = await fetch(
//       `http://localhost:9001/users/${user.user_id}/chat/${id}`
//     );
//     const data = await response.json();
//     setMessages(data);
//   };

//   async function getReceiverData() {
//     const response = await fetch(`http://localhost:9001/profile/${id}`);
//     const data = await response.json();
//     setReceiver(data.data);
//   };

//   useEffect(() => {
//     if (!id) return;
//     getReceiverData();
//     getChatData();
//   }, [id]);

//   useEffect(() => {
//     socket.on("receive_message", (payload) => {
//       getChatData();
//     });
//   }, [socket]);

//   function handleChatInput(e) {
//     setChatInput(e.target.value);
//   }

//   function handleChatPost(e) {
//     e.preventDefault();
//     if (chatInput.length === 0) return;

//     async function postChat() {
//       const response = await fetch(
//         `http://localhost:9001/users/${user.user_id}/chat/${id}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message: chatInput }),
//         }
//       );
//       const data = await response.json();
//       setMessages([...messages, data[0]]);
//     }

//     postChat();
//     socket.emit("chat", chatInput);
//     setChatInput("");
//   }

//   const messagesEndRef = useRef(null);
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <>
//       <Topbar />
//       <div className="profile">
//         <Sidebar />
//         <div className="profileRight">
//           <div className="profileRightTop">
//             <div className="profileCover">
//               <img
//                 className="profileCoverImg"
//                 src={receiver.cover_pic}
//                 alt=""
//               />
//               <img
//                 className="profileUserImg"
//                 src={receiver.profile_pic}
//                 alt=""
//               />
//             </div>
//             <div className="profileInfo">
//               <h4 className="profileInfoName">{receiver.username}</h4>
//             </div>
//           </div>
//           <div className="profileRightBottom">
//             <div classname="message-container">
//               <form
//                 className="send-container"
//                 style={{
//                   position: "relative",
//                   height: "400px",
//                   overflowY: "auto",
//                 }}
//               >
//                 {messages.length > 0 &&
//                   messages.map((message) => (
//                     <div
//                       className={`d-flex flex-row justify-content-${
//                         message.sender_id === +user.user_id ? "end" : "start"
//                       } mb-4`}
//                     >
//                       <div>
//                         <p
//                           className={`small p-2 me-3 mb-1 text-${
//                             +message.sender_id === +user.user_id
//                               ? "white"
//                               : "dark"
//                           } rounded-3`}
//                           style={{
//                             backgroundColor:
//                               +message.sender_id === +user.user_id
//                                 ? "#343a40"
//                                 : "#e4e6eb",
//                           marginLeft: +message.sender_id === +user.user_id ? '0px' : '13px'}}
//                         >
//                           {message.message}
//                         </p>
//                         <p className="small me3- mb-3 rounded-3 text-muted d-flex justify-content-end" style={{marginLeft: +message.sender_id === +user.user_id ? '0px' : '13px'}}>
//                           {DateTime.fromISO(message.time_posted).toRelative()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 <div ref={messagesEndRef}></div>
//               </form>
//               <textarea
//                 className="message"
//                 cols="9"
//                 rows="1"
//                 value={chatInput}
//                 onChange={handleChatInput}
//               ></textarea>
//               <button type="submit" onClick={handleChatPost} className="send-button">
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
