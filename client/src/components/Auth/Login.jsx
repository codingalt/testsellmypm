import React, { useState } from "react";
import signup from "../../images/ml2.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useContext } from "react";
import MainContext from "../Context/MainContext";
import API from "../axios";

const Login = () => {
  const {isAuthenticated} = useContext(MainContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const getData = (e) => {
    setError(false);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    
    const {email, password} = user;
   
      setLoader(true);
    const res = await fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    setLoader(false);
    if (!data.success) {
      setErrorMsg(data.message);
      setError(true);
    } else {
      navigate(`/dashboard`);
      window.location.reload(false);
    }
  };

  return (
    <div>
      <div className="main-container">
        <TailSpin
          height="110"
          width="110"
          color="#744BBE"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="loader_wrapper"
          visible={loader}
        />
        <div className="signup-wrapper shadow">
          <div
            className="row"
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="col-md-6 form-section">
              <form>
                <div className="welcome-txt text-center mb-4">
                  <h3>Welcome Back</h3>
                  <p className="text-muted">
                    Welcome! Please Enter Your details.
                  </p>
                </div>
                {error && (
                  <div
                    className="error-message mb-1 text-center"
                    style={{ width: "100%" }}
                  >
                    <small className="form-text text-danger text-center">
                      {errorMsg}
                    </small>
                  </div>
                )}
                <div className="form-group mb-4">
                  <label className="mb-1">Email address</label>
                  <input
                    name="email"
                    onChange={getData}
                    value={user.email}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={getData}
                    value={user.password}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="submit"
                    onClick={postData}
                    style={{ height: "2.65rem" }}
                    className="btn btn-dark mt-4"
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p>
                    Don't have an account?{" "}
                    <NavLink to={"/signup"}>Sign up</NavLink>
                  </p>
                </div>
              </form>
            </div>
            <div className="col-md-6 image-section">
              <img src={signup} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
