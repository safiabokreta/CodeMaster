import React from "react";
import "../assets/styles/settings/successfulresetpasswrodprofile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Successfulresetpasswrodprofile = () => {
  return (
    <div className="settings5-container">
      <Sidebar />
      <div className="settings5-content">
     

        <h1 className="settings-title">Settings</h1>

          <div className="button5-row">
                        <Link to="/settings">
            
            <button className="btn5-greeen">
              <div className="tit5" >Successful password reset !</div>
              <div className="tex5">You can now use your new password to login to your account</div>
</button>
</Link>
         
        </div>
      </div>
    </div>
  );
};

export default Successfulresetpasswrodprofile;
