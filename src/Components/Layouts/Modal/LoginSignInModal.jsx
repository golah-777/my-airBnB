import React from "react";
import "./modal.css";
import SignInLoggin from "./SignInLoggin";

export default function LoginSignInModal() {
  return (
    <div className="site-modal">
      <div className="modal-content">
        <SignInLoggin/>
      </div>
    </div>
  );
}
