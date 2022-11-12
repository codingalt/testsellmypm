import React from 'react'
import './chat.css'
import * as bi from 'react-icons/bi'
import s1 from '../../../images/slider/s1.jpg'
import s2 from '../../../images/slider/s2.jpg'
import s3 from '../../../images/slider/s3.jpg'
import s4 from '../../../images/slider/s4.jpg'
import { useState } from 'react'
import { useContext } from 'react'
import MainContext from '../../Context/MainContext'
import { useEffect } from 'react'
import defaultProfile from '../../../images/avatar.png'
import profile from '../../../images/profile2.jpg'

const Conversation = ({data,activeChatMob, isRead, currentUserId,chats,currentChat, online,messages}) => {
    const [loader, setLoader] = useState(true);
    const [userData, setUserData] = useState(null);
    // const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState("");
    const [activeChat, setActiveChat] = useState(false)
    const [advisorName, setAdvisorName] = useState('');

    const getUserData = async (userId) => {
        setLoader(true);
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
          setLoader(false);
        } catch (error) {
          console.log(error);
        }
      };

      const getAdvisorData = async (userId) => {
        setLoader(true);
        try {
          const res = await fetch(`/advisors/${userId}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (data.length !== 0) {
            setAdvisorName(data.advisor?.name)
          } else {
            setAdvisorName(null)
          }
          setLoader(false);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        setLastMessage(data.lastMessage)
      },[messages,currentChat])

    useEffect(()=>{
        const userId = data.members.find((id)=> id !== currentUserId);
        const members = chats[0].members
       const chatIndex = members.findIndex((chat)=> chat === userId);
       if(chatIndex === 0){
        setActiveChat(true)
       }
        getUserData(userId)
        getAdvisorData(userId)
    },[data,currentUserId])

  return (
            <>
                <li onClick={activeChatMob}>
                    <div className="image">
                        {/* <img src={userData?.profilePicture.url? userData.profilePicture.url : defaultProfile} alt="" /> */}
                        <img src={profile} alt="" />
                    <div className={online ? 'online-status' : 'offline-status'}></div>
                    </div>
                    <div className="c-detail">
                      {/* {
                        isRead > 0 &&
                        <div className="isRead">{isRead}</div>
                      } */}
                        <div className="name">{(userData?.name) ? userData.name : advisorName}</div>
                        <div className="preview">{lastMessage?.slice(0,32)}...</div>
                    </div>
                </li>
          
            </>
  )
}

export default Conversation