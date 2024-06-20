import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { open_modal } from "../../../Redux/Features/OpenCloseModal/openCloseSlice";
import {
  loggedIn,
  loggedOut,
} from "../../../Redux/Features/Auth/onAuthStateSlice";
import "./header.css";
import LoginSignInModal from "../Modal/LoginSignInModal";

export default function Header() {
  const modal = useSelector((state) => state.modal.openCloseModal);
  const onAuth = useSelector((state) => state.onAuth.onAuth);
  const dispatch = useDispatch();

  const handleOpenModal = () => dispatch(open_modal());

  const handleLogOut = () =>{
    localStorage.removeItem('LoggedIn');
    dispatch(loggedOut())
  }

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("LoggedIn");
    if (userLoggedIn) {
      dispatch(loggedIn());
    } else {
      dispatch(loggedOut());
    }
  },[]);

  return (
    <>
      {modal && <LoginSignInModal />}
      <div className="header">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*87ce_sVbWHSHpDhCMBwKtA.png"
          className="header_logo"
          alt="logo"
        />
        <div className="header_center">
          <input type="text"></input>
          <i className="material-icons">search</i>
        </div>
        <div className="header_right">
          <p>Airbnb your home</p>
          <i className="material-icons">language</i>
          {onAuth ? (
            <span onClick={handleLogOut}>Hey user,log out?</span>
          ) : (
            <span onClick={handleOpenModal}>Log in</span>
          )}
          <i className="material-icons avater">account_circle</i>
        </div>
      </div>
    </>
  );
}
