import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  close_modal,
  open_modal,
} from "../../../Redux/Features/OpenCloseModal/openCloseSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  phone_info,
  phone_valid,
  sign_Up,
} from "../../../Redux/Features/Form/formSlice";
import {
  user_email,
  user_name,
  user_password,
  user_signup_request,
  user_signup_success,
  user_signup_fail,
} from "../../../Redux/Features/Auth/authSignUpSlice";
import { loggedIn } from "../../../Redux/Features/Auth/onAuthStateSlice";
import { parsePhoneNumber } from "libphonenumber-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function SignInLoggin() {
  const formInfo = useSelector((state) => state.formInfo);
  const onAuth = useSelector((state) => state.onAuth.onAuth);
  const { phone, valid, showSignUpForm } = formInfo;
  useEffect(() => {
    if (onAuth) {
      dispatch(close_modal());
    } else {
      dispatch(open_modal());
    }
  }, [onAuth]);

  const dispatch = useDispatch();

  const handleChange = (value, countryData) => {
    dispatch(phone_info(value));

    try {
      const phoneNumber = parsePhoneNumber(
        value,
        countryData.countryCode.toUpperCase()
      );
      dispatch(phone_valid(phoneNumber.isValid()));
    } catch (error) {
      dispatch(phone_valid(false));
    }
  };

  const handleCloseModal = () => {
    dispatch(close_modal());
    dispatch(sign_Up(false));
  };

  const handleShowSignUpForm = () => {
    dispatch(sign_Up(true));
  };

  //sign up and log in user start
  const userInfo = useSelector((state) => state.signUp);
  const { email, names, password, loading } = userInfo;

  const handleNameChange = (e) => {
    dispatch(user_name(e.target.value));
  };
  const handleEmailChange = (e) => {
    dispatch(user_email(e.target.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(user_password(e.target.value));
  };

  //signup

  const handleSignUp = async () => {
    dispatch(user_signup_request());

    try {
      const addUserTo_db = async () => {
        const getUser = await axios.get("http://localhost:5000/users", {
          email,
          phone,
        });
        const getUserRes = getUser.data;
        getUserRes.filter(async (dbUser) => {
          if (
            email === dbUser.email &&
            phone === dbUser.phone &&
            dbUser != null
          ) {
            alert("You already have an accout");
          } else {
            const user = await axios.post("http://localhost:5000/users", {
              id: uuidv4(),
              names,
              email,
              password,
              phone,
            });
            const res = user.data;
            localStorage.setItem("LoggedIn", JSON.stringify(res));
            alert("registered");
            dispatch(user_signup_success());
            dispatch(loggedIn());
            dispatch(sign_Up(false));
          }
        });
      };

      addUserTo_db();
    } catch (error) {
      dispatch(user_signup_fail(error));
    }
  };

  //login

  const handleLogin = () => {
    dispatch(user_signup_request());
    try {
      const getUserDb = async () => {
        const user = await axios.get("http://localhost:5000/users", {
          email,
          password,
        });

        const res = user.data;

        res.filter((user) => {
          if (email === user.email) {
            localStorage.setItem("LoggedIn", JSON.stringify(user));
            dispatch(user_signup_success());
            dispatch(loggedIn());
            dispatch(sign_Up(false));
          } else {
            dispatch(user_signup_fail());
            alert("Account not found please register");
          }
        });
      };

      getUserDb();
    } catch (error) {
      dispatch(user_signup_fail());
    }
  };

  return (
    <>
      <div className="form_header">
        <span className="material-icons" onClick={handleCloseModal}>
          close
        </span>
        <h3>Log in or Sign up</h3>
      </div>
      <div className="form_body">
        <h2>Welcome to Airbnb</h2>
        <input
          value={names}
          onChange={handleNameChange}
          className="browser-default"
          placeholder="Names"
          type="text"
          style={{ display: !showSignUpForm ? "none" : "inline" }}
        ></input>
        <div
          className="country-code"
          style={{ display: !showSignUpForm ? "none" : "inline" }}
        >
          <PhoneInput
            country={"us"}
            placeholder="Please entre your number"
            value={phone}
            onChange={(value, country) => handleChange(value, country)}
            inputStyle={{
              width: "545px",
              padding: "0px 50px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #9c9b9b",
              borderRadius: "9px",
              border: valid ? "1px solid #9c9b9b" : "1px solid red",
            }}
          />
        </div>
        <input
          value={email}
          onChange={handleEmailChange}
          className="browser-default email"
          placeholder="Email address"
          type="text"
        ></input>
        <input
          value={password}
          onChange={handlePasswordChange}
          className="browser-default"
          placeholder="Password"
          type="password"
        ></input>
        {!showSignUpForm ? (
          <button className="login-button" onClick={handleLogin}>
            <span>Log in</span>
          </button>
        ) : (
          <button className="login-button" onClick={handleSignUp}>
            <span>Sign up</span>
          </button>
        )}
        <div className="divider">
          <div className="divider_line"></div>
          <span>or</span>
          <div className="divider_line"></div>
        </div>
        <button className="other_methods">
          <div className="icon">
            <img
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiMzRjUxQjUiIGQ9Ik00MiwzN2MwLDIuNzYyLTIuMjM4LDUtNSw1SDExYy0yLjc2MSwwLTUtMi4yMzgtNS01VjExYzAtMi43NjIsMi4yMzktNSw1LTVoMjZjMi43NjIsMCw1LDIuMjM4LDUsNVYzN3oiPjwvcGF0aD48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMzQuMzY4LDI1SDMxdjEzaC01VjI1aC0zdi00aDN2LTIuNDFjMC4wMDItMy41MDgsMS40NTktNS41OSw1LjU5Mi01LjU5SDM1djRoLTIuMjg3QzMxLjEwNCwxNywzMSwxNy42LDMxLDE4LjcyM1YyMWg0TDM0LjM2OCwyNXoiPjwvcGF0aD4KPC9zdmc+"
            />
          </div>
          <span>Continue with Facebook</span>
        </button>
        <button className="other_methods">
          <div className="icon">
            <img
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTIJczUuMzczLTEyLDEyLTEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTIuOTU1LDQsNCwxMi45NTUsNCwyNHM4Ljk1NSwyMCwyMCwyMAlzMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNlNTM5MzUiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOQlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2CWMtNS4yMDIsMC05LjYxOS0zLjMxNy0xMS4yODMtNy45NDZsLTYuNTIyLDUuMDI1QzkuNTA1LDM5LjU1NiwxNi4yMjcsNDQsMjQsNDR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzE1NjVjMCIgZD0iTTQzLjYxMSwyMC4wODNMNDMuNTk1LDIwTDQyLDIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MQljMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD4KPC9zdmc+"
            />
          </div>
          <span>Continue with Google</span>
        </button>
        <button
          style={{ display: showSignUpForm ? "none" : "inline" }}
          className="login-button"
          onClick={handleShowSignUpForm}
        >
          <span>Sign up</span>
        </button>
      </div>
    </>
  );
}
