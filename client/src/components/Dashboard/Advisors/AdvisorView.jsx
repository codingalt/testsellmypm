import React, { useContext, useEffect, useState } from "react";
import "./advisorview.css";
import * as bs from "react-icons/bs";
import * as md from "react-icons/md";
import * as ai from "react-icons/ai";
import * as fa from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import circle from '../../../images/circle.png'
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import loadingProfile from '../../../images/loadingProfile.png'
import MainContext from "../../Context/MainContext";

const AdvisorView = () => {
  const [loader, setLoader] = useState(null);
  const {advisorId} = useParams();
  const [advisor, setAdvisor] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [chatId, setChatId] = useState('');
  const { isPaid, myOwnId } = useContext(MainContext);
  let pathname = window.location;
  const navigate = useNavigate();

  // Create chat and send message
  const createChat = async () => {
    if (!isPaid) {
      toastHandle(false,"You are not a Paid Member. Please Activate a Membership Package");
       return;
     }
    if(myOwnId === advisorId){
      toastHandle(false, "Unable to send message to this profile.");
      return;
    }
    try {
      const res = await fetch(`/chat/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: myOwnId,
          receiverId: advisorId
        })
      });
      const data = await res.json();
      if(data.success){
        setChatId(data._id)
        sendMessage(data._id);
      }else{
        setChatId(data.chat._id)
        sendMessage(data.chat._id);
        console.log(data.chat._id);
      }
      
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (chatId) => {
    try {
      const res = await fetch(`/message`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: myOwnId,
          chatId: chatId,
          text: messageText
        })
      });
      const data = await res.json();
      if(res.ok){
        toastHandle(true, 'Message Sent Successfully. Go to Dashboard to view your chat!');
        setMessageText('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get Single Advisor
  const getAdvisor = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/advisors/${advisorId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setAdvisor(data.advisor);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAdvisor();
  },[advisorId])

  const toastHandle = (result, message) => {
    if (result) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    pathname = window.location.href;
}, [window.location.href]);

  const copyProfile = ()=>{
    navigator.clipboard.writeText(pathname)
    toastHandle(true, "URL Copied to clipboard.");
  }

  return (
    <div className="advisor-view">
      <ToastContainer />
      <div className="back-button">
        <NavLink to={'/advisors'}>
        <div className="back shadow-sm border">
          <ai.AiOutlineArrowLeft />
        </div>
        </NavLink>
        <div onClick={()=> navigate('./')} className="text">Back</div>
      </div>
      <div className="row advisor-view-row">
        <div className="col-md-7 av-left">
          <div className="copy-profile-link border" onClick={copyProfile}>
            <span><bs.BsLink45Deg /></span>
          </div>
          <div className="a-details">
            <div className="c-profile">
              <img
                src={!loader? advisor.profilePicture?.url : loadingProfile}
                alt=""
              />
            </div>
            <div className="info">
              <div className="c-top">
                <div className="name">{advisor?.name}</div>
                <div className="c-award">
                  <span>
                    <bs.BsTrophyFill />
                  </span>
                  <span>Top closer</span>
                </div>
              </div>
              <div className="card-title av-title">
              {advisor?.title}
              </div>
              <div className="a-location">
                <span>
                  <md.MdLocationOn />
                </span>
                <span>{advisor?.location}</span>
              </div>
            </div>
          </div>
            
          <div className="deal-info av-deal-info">
            <div className="inner">
                <span>Preferred deal size</span>
                <div className="icon">
                    <span><fa.FaWallet /></span>
                    <span>{advisor?.dealSize}</span>
                </div>
            </div>
            <div className="inner">
                <span>On SellMyPm since</span>
                <div className="icon">
                    <span><md.MdAccessTimeFilled /></span>
                    <span>{advisor?.since}</span>
                </div>
            </div>
            <div className="inner">
                <span>Deals closed</span>
                <div className="icon">
                    <span><fa.FaMoneyCheck /></span>
                    <span>{advisor?.dealsClosed}</span>
                </div>
            </div>
        </div>

        <div className="av-expertise">
            <div className="expertise-title">Expertise</div>
            <ul>
              {
                advisor?.expertise?.map((item,i)=>(
                  item !== "" &&
                  <li key={i}><bs.BsFillRecordCircleFill /> {item}</li>
                ))
              }
            </ul>
        </div>

        <div className="short-bio">
          <span>Short Bio</span>
          <span>{advisor?.shortBio}</span>
        </div>

        <div className="linkdin-link">
          <span>LinkedIn</span>
          <a target="_blank" href={advisor?.linkdin}>{advisor?.linkdin}</a>
        </div>

        <div className="linkdin-link">
          <span>Website</span>
          <a target="_blank" href={advisor?.website}>{advisor?.website}</a>
        </div>

        </div>
        <div className="col-md-5 av-right">
          <div className="av-message-box">
            <div className="av-title">Let’s work together</div>
            <div className="av-descript">
              Tell me briefly about your startup, acquisition goals, and budget
            </div>
            <div className="av-message">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="av-label">Message</label>
                    <textarea
                      type="text"
                      className="form-control"
                      required
                      rows={5}
                      value={messageText}
                      onChange={(e)=> {setMessageText(e.target.value)}}
                    />
                  </div>
                </div>
              </div>
              <button onClick={createChat} className="av-message-btn button">Message <ai.AiOutlineArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorView;
