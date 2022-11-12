import React from 'react'
import FilterAdvisor from './FilterAdvisor'
import './advisors.css'
import AdvisorCard from './AdvisorCard'
import { TailSpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { sidebarContext } from '../contexts/SidebarContext';

const Advisors = () => {
  const [loader, setLoader] = useState(null);
  const {advisors} = useContext(sidebarContext);
  // const [advisors, setAdvisors] = useState([]);
  // const [keyword, setKeyword] = useState("");

  // const getAdvisors = async () => {
  //   setLoader(true);
  //   const res = await fetch(`/advisors/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   if(data.success){
  //     setAdvisors(data.advisors)
  //   }
  //   setLoader(false);
  // };

  // const getAdvisorsBySearch = async () => {
  //   if (keyword === "") {
  //     return;
  //   }
  //   setLoader(true);
  //   const res = await fetch(`/advisors/?keyword=${keyword}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   if(data.success){
  //     setAdvisors(data.advisors)
  //   }
  //   setLoader(false);
  // };

  // useEffect(()=>{
  //   if(keyword === ""){
  //     getAdvisors();
  //   }
  // },[keyword])

  // const handleKeyDown = event => {
  //   if (event.key === 'Enter') {
  //     getAdvisorsBySearch();
  //   }
  // };

  return (
    <div className='advisor-container'>
        <FilterAdvisor />
        <div className="row advisor-row">
          {
            advisors?.map((item,i)=>(
              <AdvisorCard loader={loader} key={item._id} advisors={item} />
            ))
          }
            
        </div>
    </div>
  )
}

export default Advisors