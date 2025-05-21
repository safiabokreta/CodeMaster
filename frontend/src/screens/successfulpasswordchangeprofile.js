import React from "react";
import "../assets/styles/settings/successfulpasswordchangeprofile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Successfulemailchangeprofile = () => {
  return (
    <div className="settings8-container">
    <Sidebar />
    <div className="settings8-content">
   

      <h1 className="settings8-title">Settings</h1>

        <div className="button8-row">
                      <Link to="/settings">
          
          <button className="btn8-greeen">
            <div className="tit8" >Successful password reset !</div>
            <div className="tex8">You can now use your new password to login to your account</div>
</button>
</Link>
       
      </div>
    </div>
  </div>
);
  
};

export default Successfulemailchangeprofile;
