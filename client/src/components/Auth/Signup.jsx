import React, { useState } from "react";
import "./signup.css";
import signup from "../../images/ml2.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Signup = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    terms: "",
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
    const { name, email, password, confirmPass, terms } = user;
    if (terms === "") {
      setErrorMsg("Please Agree to Our Terms & Conditions");
      setError(true);
      return;
    }

    setLoader(true);
    const res = await fetch(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPass,
        terms,
      }),
    });
    const data = await res.json();
    setLoader(false);
    if (!data.success) {
      setErrorMsg(data.message);
      setError(true);
    } else {
      navigate(`/login`);
    }
  };
  return (
    <div>
      <div className="main-container">
        <TailSpin
          height="60"
          width="60"
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
                  <h3>Welcome Here</h3>
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
                <div className="form-group mb-3">
                  <label className="mb-1">Name</label>
                  <input
                    onChange={getData}
                    value={user.name}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    onChange={getData}
                    value={user.email}
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={getData}
                    value={user.password}
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPass"
                    onChange={getData}
                    value={user.confirmPass}
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="form-group d-flex align-items-center mt-3">
                  <input
                    name="terms"
                    onChange={getData}
                    value="checked"
                    type="checkbox"
                    required
                    style={{ transform: "scale(1.4)", marginRight: "12px" }}
                  />
                  <small>
                    Before Signing Up, Agree to Our{" "}
                    <NavLink to={"/terms"}>Terms and Conditions </NavLink>
                  </small>
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
                    Sign Up
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p>
                    Already have an account?{" "}
                    <NavLink to={"/login"}>Login</NavLink>
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

export default Signup;
