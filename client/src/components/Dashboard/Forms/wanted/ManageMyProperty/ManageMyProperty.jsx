import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useFormik, ErrorMessage } from "formik";
import MainContext from "../../../../Context/MainContext";
import { toast, ToastContainer } from "react-toastify";

const ManageMyProperty = () => {
  const { categoryId } = useParams();
  const { myOwnId } = useContext(MainContext);
  const [listImages, setListImages] = useState([]);
  const [loader, setLoader] = useState(null);

  const toastHandle = (result, message) => {
    if (result.success) {
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
      userId: myOwnId,
      listType: "hirePropertyManager",
      categoryId: categoryId,
      images: [],
      details: {
        title: "",
        summary: "",
        location: {
          country: "",
          city: "",
          region: "",
        },
      },
      servicesNeeded: "",
    },
    onSubmit: (values) => {
      const postData = async () => {
        setLoader(true);
        const res = await fetch(`${process.env.REACT_APP_URI}/listing/create`, {
          method: "POST",
          credentials:'include',
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
          }),
          body: JSON.stringify(values, null, 2),
        });
        const data = await res.json();
        toastHandle(data, data.message);
        setLoader(false);
      };
      postData();
    },
  });

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setListImages((prev) => [...prev, reader.result]);
          formik.values.images.push(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="listing-contract">
      <ToastContainer />
      <div className="card border shadow-sm rounded">
        <div className="heading">Property Manager to Manage My Property</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <span>Basic Information</span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Listing Headline</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  name="details.title"
                  value={formik.values.details.title}
                  placeholder="This will appear as the main headline for your listing. For example, Contract in East London, Hackney"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>General Summary</label>
                <textarea
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  rows={7}
                  name="details.summary"
                  value={formik.values.details.summary}
                  placeholder="General Summary about Listing Contract"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Location</span>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="details.location.country"
                  value={formik.values.details.location.country}
                  className="form-control"
                  required
                  onChange={formik.handleChange}
                  placeholder="Enter the country where your Listing Contract is Located"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Region</label>
                <input
                  type="text"
                  name="details.location.region"
                  value={formik.values.details.location.region}
                  className="form-control"
                  required
                  onChange={formik.handleChange}
                  placeholder="Region"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>City / Town</label>
                <input
                  type="text"
                  name="details.location.city"
                  value={formik.values.details.location.city}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="City / Town"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Services Needed</span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Describe Services</label>
                <textarea
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  name="servicesNeeded"
                  value={formik.values.servicesNeeded}
                  placeholder="Services You Need"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Select Listing Images</label>
                <input
                  name="photo"
                  multiple
                  type="file"
                  className="mt-3"
                  onChange={imageHandler}
                  required
                  accept="image/*"
                  style={{ display: "flex", alignItems: "center" }}
                />
              </div>
            </div>
          </div>

          <div className="listing-contract-btn">
            <button
              style={loader ? { opacity: ".75" } : { opacity: "1" }}
              type="submit"
              className="button"
            >
              {loader ? "Posting..." : "Post Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageMyProperty;
