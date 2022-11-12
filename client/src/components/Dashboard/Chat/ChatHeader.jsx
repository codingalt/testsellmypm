import React, { useEffect, useState } from 'react'
import defaultProfile from '../../../images/avatar.png'
import * as ai from 'react-icons/ai'
import profile from '../../../images/profile2.jpg'

const ChatHeader = ({chat, currentUserId, online,activeChatMob,handleChatMob}) => {
    const [userData, setUserData] = useState(null)
    const [loader, setLoader] = useState(true);
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
        const userId = chat?.members?.find((id)=> id !== currentUserId);
        if(chat !== null){
            getUserData(userId)
            getAdvisorData(userId)
        }
    },[chat, currentUserId]);
  return (
    <div className="chat-header shadow-sm border">
        {
            chat? (
                <>
                <div className='mobile-back-button'>
                {activeChatMob && (
                        <ai.AiOutlineArrowLeft
                          onClick={()=>handleChatMob(false)}
                          style={{
                            fontSize: "1.2rem",
                            marginLeft:'5px',
                            marginRight: "10px",
                          }}
                          />
                )}
                </div>
                <div className="image">
                <img src={userData?.profilePicture.url? userData.profilePicture.url : profile} alt="" />
              </div>
              <div className="chat-profile">
                <div className="name">{(userData?.name) ? userData.name : advisorName}</div>
              <div className="online-status">{online ? 'Online' : 'Offline'}</div>
              </div>
              </>
            ) : (
                ""
            )
        }
   
  </div>
  )
}

export default ChatHeader