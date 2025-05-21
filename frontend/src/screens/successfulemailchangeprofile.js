import React from "react";
import "../assets/styles/settings/successfulemailchangeprofile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Successfulemailchangeprofile = () => {
  return (
    <div className="settings9-container">
      <Sidebar />
      <div className="settings9-content">
        <div className="navvv">
          <Navbar />
        </div>

        <h1 className="settings-title">Settings</h1>

                                  <Link to="/settings">
            
            <div className="btn9-greeen">
              <div className="tit9" >Email successful changed !</div>
              <div className="tex9">You can now use your new email to login to your account</div>
</div>

         </Link>
        </div>
      </div>
  );
};

export default Successfulemailchangeprofile;
