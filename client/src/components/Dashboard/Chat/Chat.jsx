import React, { useContext, useEffect, useState } from 'react'
import './chat.css'
import Conversation from './Conversation'
import * as bi from 'react-icons/bi'
import s3 from '../../../images/slider/s3.jpg'
import s1 from '../../../images/slider/s1.jpg'
import s4 from '../../../images/slider/s4.jpg'
import MainContext from '../../Context/MainContext';
import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader'
import {io} from 'socket.io-client'
import { useRef } from 'react'

const Chat = () => {
  const [loader, setLoader] = useState(true);
  const {myOwnId} = useContext(MainContext)
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [messages, setMessages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState(false);
  const [sendMessage, setSendMessage] = useState(null)
  const [search,setSearch] = useState("")
  const [chats,setChats] = useState([]);
  const [activeChatMob, setActiveChatMob] = useState(false);
  const [isOnline,setIsOnline] = useState(null)
  const [isRead, setIsRead] = useState(0)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const socket = useRef()

  const handleChatMob = () => {
    if (window.innerWidth < 800) {
      setActiveChatMob(true);
    }
  };

  window.addEventListener("resize", handleChatMob);

  useEffect(() => {
    if (currentChat !== null) {
      getMessages(currentChat._id);
    }
 
  }, [currentChat,updateMessage]);

  const getMessages = async (id) => {
    setLoader(true);
    try {
      const res = await fetch(`/message/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const currentDate = new Date();
      const msgDate = new Date(data.slice(-1)[0].createdAt)
        // console.log(data.slice(-1)[0].createdAt <= currentDate);
      if(msgDate <= currentDate){
        setIsRead(0);
      }
      // let msgCount = 0;
      // data.map((message)=>{
      //   if(!message.isRead){
      //     msgCount++;
      //   }
      // });
      // setIsRead(msgCount)
      setUpdateMessage(!updateMessage)
      if (data.length !== 0) {
        setMessages(data);
       
      } else {
        setMessages([]);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Send Message to socket server
  useEffect(()=>{
    if(sendMessage !== null){
      socket.current.emit('send-message', sendMessage)
    }
    setIsRead(isRead + 1);
    // const senderId = messages?.slice(-1)[0]?.senderId;
    // if(senderId !== myOwnId){
    //   setIsRead(isRead + 1);
    // }
    // console.log(isRead);
  },[sendMessage])

  useEffect(()=>{
    socket.current = io('http://localhost:8800')
    if(myOwnId){
      socket.current.emit('new-user-add', myOwnId)
    }
    socket.current.on('get-users', (user)=>{
      setOnlineUsers(user)
    })
  },[myOwnId])

   // Receive Message from socket server
   useEffect(()=>{
    socket.current.on('receive-message', (data)=>{
      setReceiveMessage(data)
    })
  
  },[receiveMessage])

  const getChats = async () => {
      setLoader(true);
      try {
        const res = await fetch(`/chat/`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.length !== 0) {
          setChats(data);
        } else {
          setChats([]);
        }
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
      getChats();
    },[updateMessage,messages]);

    const checkOnlineStatus = ()=>{
      const chatMember = currentChat?.members.find((member)=> member !== myOwnId);
      const online = onlineUsers.find((user)=> user.userId === chatMember);
      online? setIsOnline(true) : setIsOnline(false)
      return online? true : false
    }
    const checkOnlineStatus2 = (chat)=>{
      const chatMember = chat?.members.find((member)=> member !== myOwnId);
      const online = onlineUsers.find((user)=> user.userId === chatMember);
      return online? true : false
    }

    useEffect(()=>{
      if(search === ""){
        getChats();
      }
    },[search])

    useEffect(()=>{
      checkOnlineStatus();
    },[currentChat]);

    const messageSeen = async (chat) => {
      try {
        const res = await fetch(`/messageseen/${chat._id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    // useEffect(()=>{
    //   messageSeen(currentChat);
    // },[currentChat,sendMessage,updateMessage,messages])

    const handleSearch = ()=>{
        chats?.filter((chat)=>{
          if(chat.receiverName.toLowerCase().includes(search.toLowerCase()) || chat.senderName.toLowerCase().includes(search.toLowerCase())){
           setChats([chat])
          }
        })
    }

    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };


  return (
    <div className='chat-wrapper'>
      <div className="chat-container">
      <div className='chat-left' style={activeChatMob ? { display: "none" } : { display: "block" }}>
        <div className="c-left-heading">
          <span>Chats</span>
        </div>
      <div className="chat-search border">
            <bi.BiSearch />
            <input type="text" value={search} onKeyDown={handleKeyDown} onChange={(e)=>{setSearch(e.target.value)}} placeholder='SEARCH' />
        </div>

        <div className="conversation shadow-sm border">
          <ul>
        {
          chats?.map((chat)=>(
            <div key={chat._id} onClick={()=> {setCurrentChat(chat);}}>
              <Conversation isRead={isRead} activeChatMob={handleChatMob} messages={messages} data={chat} currentChat={currentChat} chats={chats} currentUserId={myOwnId} online={checkOnlineStatus2(chat)} />
            </div>
          ))
        }

          </ul>
       
        </div>
        </div>
        

        {/* Messages  */}

        {
          <div className={activeChatMob ? 'chat-right active_chat_section' : 'chat-right'}>

        <ChatHeader activeChatMob={activeChatMob} handleChatMob={setActiveChatMob} online={isOnline} chat={currentChat} currentUserId={myOwnId} />

          <div className="message-container shadow-sm border">
            <ChatBody chat={currentChat} currentUserId={myOwnId} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
          </div>
          {/* end of message container div  */}

        </div>
        }

        
      </div>
    </div>
  )
}

export default Chat