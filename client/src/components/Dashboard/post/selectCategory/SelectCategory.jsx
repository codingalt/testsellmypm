import React from "react";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import './select-category.css';

const SelectCategory = () => {
    const [categoryId,setCategoryId] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [radioBoxValue,setRadioBoxValue] = useState('forsell')
    const [wanted,setWanted] = useState([]);
    const [forSell, setForSell] = useState([]);

    const handleCategoryType = (e)=>{
        setRadioBoxValue(e.target.value);
        if(e.target.value === 'forsell'){
            setCategoryId(forSell[0]._id);
            setCategoryType('buisnessforsale')
        }else{
            setCategoryId(wanted[0]._id)
            setCategoryType('buyABuisness')
        }
    }

    const handleOption = (e)=>{
        setCategoryId(e.target.value);
        console.log(e.target.value);
        const getCategoryById = async()=>{
          try {
            const res = await fetch(`/categories/${e.target.value}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
            const data = await res.json();
            setCategoryType(data.categories.shortKey);  
          } catch (error) {
            console.log(error);
          }
        }
        getCategoryById();
    }

     // get All categories
  const getCategories = async()=>{
    try {
      const res = await fetch(`/categories`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if(data.success){
        const forSellArr = []
        const wantedArr = []
        data.categories.filter((item)=> item.type === 'sell').map((item,i)=>{
            forSellArr[i] = item;
        });
        setForSell(forSellArr);
        setCategoryId(forSellArr[0]._id)
        data.categories.filter((item)=> item.type === 'wanted').map((item,i)=>{
            wantedArr[i] = item;
        });
        setWanted(wantedArr);
      }  
    } catch (error) {
      setWanted([]);
      setForSell([]);
    }
  }

  useEffect(()=>{
    getCategories();
    if(radioBoxValue === 'forsell'){
      setCategoryType('buisnessforsale')
    }else{
      setCategoryType('buyABuisness')
    }
  },[]);

  return (
    <div className="select-cat">
      <div className="cat-box border shadow-sm">
        <div className="title">
          <span>Post New Listing</span>
        </div>
        <div className="select-box">
          <div className="form-group">
            <input type="radio" onChange={handleCategoryType} value='forsell' className="form-check-input" name="listType" defaultChecked />
            <span>For Sale</span>
          </div>
          <div className="form-group">
            <input type="radio" value='wanted' onChange={handleCategoryType} className="form-check-input" name="listType" />
            <span>Wanted</span>
          </div>
        </div>
        <div className="form-group select">
        <label>Category</label>
        <select value={categoryId} onChange={handleOption} className="form-select form-select-lg" aria-label="Please Select">
          {
            radioBoxValue === 'forsell' ? (
            forSell?.map((item,i)=>{
                return(
                    <option value={item._id} key={item._id}>{item.name}</option>
                )
            })
            ) : (
                wanted?.map((item,i)=>{
                    return(
                        <option value={item._id} key={item._id}>{item.name}</option>
                    )
                })
            )
          }
        </select>
        </div>
        <div className="cat-button">
          <NavLink to={`/post/listing/${categoryType}/${categoryId}`}>
            <button className="button">Next</button>
            </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
