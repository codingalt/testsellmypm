import React from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import * as fi from "react-icons/fi";
import * as im from "react-icons/im";
import { useState } from "react";
import { useEffect } from "react";
import defaultProfile from "../../../images/avatar.png";
import noChat from '../../../images/nochat.png'
import { useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";

const ChatBody = ({ chat, currentUserId, setSendMessage, receiveMessage}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loader, setLoader] = useState(true);
  const scroll = useRef()
  
  useEffect(() => {
    if (chat !== null) {
      getMessages(chat._id);
    }
  }, [chat,updateMessage]);

       // Receive Message
       useEffect(()=>{
        if(receiveMessage !== null && receiveMessage?.chatId === chat?._id){
          setMessages([...messages, receiveMessage])
        }
      },[receiveMessage])

  const getUserData = async (userId) => {
    try {
      const res = await fetch(`/user/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.length !== 0) {
        setUserData(data.user);
      } else {
        setUserData("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    if (chat !== null) {
      getUserData(userId);
    }
  }, [chat]);

  // get Messages
  const getMessages = async (id) => {
    try {
      const res = await fetch(`/message/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUpdateMessage(!updateMessage)
      if (data.length !== 0) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Send Message to database
  const sendNewMessage = async (message) => {
    setLoader(true);
    const res = await fetch(`/message/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const data = await res.json();
    setMessages([...messages, data])
    setNewMessage("")
    setLoader(false);
    // send message to socket server 
    const receiverId = chat?.members?.find((id) => id !== currentUserId);
    setSendMessage({...message, receiverId})
    getMessages(chat._id)
  };

  const handleSend = (e)=>{
    e.preventDefault();
    if(newMessage === ""){
      return;
    }
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id
    }

    sendNewMessage(message)
    // send message to socket server 
    const receiverId = chat?.members?.find((id) => id !== currentUserId);
    setSendMessage({...message, receiverId})
  }

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: 'smooth'})
  },[messages]);

  return (
    <>
      <div className="chat-body">
        <ScrollableFeed>
        {chat ? (
          messages?.map((message) => (
              <div key={message._id}>
                <div 
                  className={
                    message.senderId === currentUserId
                      ? "my-message"
                      : "message-box"
                  }
                >
                  {message.senderId === currentUserId ? (
                    ""
                  ) : (
                    <div className="image">
                      <img
                        src={
                          userData?.profilePicture.url
                            ? userData.profilePicture.url
                            : defaultProfile
                        }
                        alt=""
                      />
                    </div>
                  )}

                  <div
                    className={
                      message.senderId === currentUserId
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </div>

              
              </div>
               
          ))
         
          
        ) : (
            <div className="no-chat-message">
                <img src={noChat} alt="" />
                <span>Tap on the Chat to Start a Conversation</span>
            </div>
        )}
       
        </ScrollableFeed>
        {
          chat?
          <div className="chat-sender">
               <InputEmoji value={newMessage} onChange={handleChange} />
               {/* <div className="file-select">
                 <im.ImLink />
               </div> */}
               <div className="send-button" onClick={handleSend}>
                 <fi.FiSend />
               </div>
             </div> : ""
        }
        
      </div>
    </>
  );
};

export default ChatBody;
