import React, { useState } from "react";
import { useFormik } from 'formik';
import { TailSpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import MainContext from "../../../Context/MainContext";

const CreateAdvisor = () => {
  const [loader, setLoader] = useState(null);
  const [profilePicture, setProfilePicture] = useState([]);

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
        autoClose: 11000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
        name: '',
        title: '',
        location: '',
        dealSize: '',
        since: '',
        dealsClosed: 0,
        expertise: [],
        shortBio: '',
        linkdin: '',
        website: '',
        profilePicture: [],
         
    },
    onSubmit: values => {
      console.log(JSON.stringify(values.expertise, null, 2));
      const postData = async () => {
        setLoader(true);
        const res = await fetch(`/advisor/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values,null,2),
        });
        const data = await res.json();
        console.log(data);
        if(data.success){
          toastHandle(true, 'Advisor Profile Created Successfully.');
        }
        setLoader(false);
      formik.resetForm();
      };
      postData();
    },
  });

  const profileHandler = (e)=>{
    const files = Array.from(e.target.files);
    files.forEach((file)=>{
      const reader = new FileReader();

      reader.onload = ()=>{
        if(reader.readyState === 2){
          setProfilePicture((prev)=> [...prev, reader.result])
          formik.values.profilePicture.push(reader.result)
        }
      }

      reader.readAsDataURL(file);
    })
  }

  return (
    <div className="listing-contract">
      <ToastContainer />
      <TailSpin
        height="60"
        width="60"
        color="#744BBE"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="loader_wrapper2"
        visible={loader}
      />
      <div className="card border shadow-sm rounded">
        <div className="heading">Create Advisor Profile</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  placeholder="Title that will appear on advisor profile"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  placeholder="Eg: Dellas, Texas"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Prefrred deal size</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="dealSize"
                  value={formik.values.dealSize}
                  onChange={formik.handleChange}
                  placeholder="Preferred deal size"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>On SellMyPM Since</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="since"
                  value={formik.values.since}
                  onChange={formik.handleChange}
                  placeholder="Eg: October 2021"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Deals closed</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  name="dealsClosed"
                  value={formik.values.dealsClosed}
                  onChange={formik.handleChange}
                  placeholder="Deals closed"
                />
              </div>
            </div>
          </div>

          <div className="title">
              <span>Expertise</span>
            </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 1</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="expertise[0]"
                  value={formik.values.expertise[0]}
                  onChange={formik.handleChange}
                  placeholder="Eg: Due Diligence"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 2 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="expertise[1]"
                  value={formik.values.expertise[1]}
                  onChange={formik.handleChange}
                  placeholder="Eg: M&A"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 3 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="expertise[2]"
                  value={formik.values.expertise[2]}
                  onChange={formik.handleChange}
                  placeholder="Eg: Negotiations"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 4 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="expertise[3]"
                  value={formik.values.expertise[3]}
                  onChange={formik.handleChange}
                  placeholder="Eg: Valuation"
                />
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 5 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="expertise[4]"
                  value={formik.values.expertise[4]}
                  onChange={formik.handleChange}
                  placeholder="Eg: Due Diligence"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 6 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="expertise[5]"
                  value={formik.values.expertise[5]}
                  onChange={formik.handleChange}
                  placeholder="Eg: M&A"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 7 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="expertise[6]"
                  value={formik.values.expertise[6]}
                  onChange={formik.handleChange}
                  placeholder="Eg: Negotiations"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Expertise 8 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="expertise[7]"
                  value={formik.values.expertise[7]}
                  onChange={formik.handleChange}
                  placeholder="Eg: Valuation"
                />
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Short Bio</label>
                <textarea
                  className="form-control"
                  required
                  name="shortBio"
                  value={formik.values.shortBio}
                  onChange={formik.handleChange}
                  rows={6}
                  placeholder="Short Bio"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Linkdin</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="linkdin"
                  value={formik.values.linkdin}
                  onChange={formik.handleChange}
                  placeholder="Linkdin Profile Link"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  placeholder="Website"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Profile Pic</label>
                <input
                  name="profilePicture"
                  type="file"
                  className="mt-3"
                  onChange={profileHandler}
                  required
                  accept="image/*"
                  style={{display:'flex',alignItems:'center'}}
                />
              </div>
            </div>
          </div>

          <div className="listing-contract-btn">
            <button style={loader ? {opacity: '.75'} : {opacity: '1'}} type="submit" className="button">{loader ? 'Please wait...' : 'Create Advisor Profile'}</button>
            </div>


        </form>

      </div>
    </div>
  );
};

export default CreateAdvisor;
