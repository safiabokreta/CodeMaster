import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "../assets/styles/profile/profile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setError('No user email found. Please log in again.');
      setLoading(false);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/auth/public-profile/?email=${encodeURIComponent(email)}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    navigate('/editprofile');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
      <Sidebar />

      <div className="main-content">
      
        <div className="profile-content">
      
          <div>
            <h1 className="section-title">Personal Details</h1>
            <div className="profile-main">
              <div className="profile-left">
                <div className="profile-img-wrapper">
                  <img
                    src={require("../assets/images/profile.jpg")}
                    alt="Profile"
                    className="profile-img"
                  />
                  <button className="edit-photo-btn">
                    <FaEdit /> Edit Photo
                  </button>
                </div>
              </div>

              <div className="profile-right">
                <div className="info-group">
                  <h2 className="label">User Name</h2>
                  <p className="value">{profile?.username || ""}</p>
                </div>

                <div className="info-group">
                  <h2 className="label">My Bio</h2>
                  <p className="value">{profile?.bio || ""}</p>
                </div>

                <div className="info-group">
                  <h2 className="label">Programming Level</h2>
                  <p className="value">{profile?.programming_level || ""}</p>
                </div>

                <div className="info-group">
                  <h2 className="label">English Level</h2>
                  <p className="value">{profile?.english_level || ""}</p>
                </div>

                <div className="info-group">
                  <h2 className="label">Contact Details</h2>
                  <p className="valuee">Email</p>
                  <p className="value">{profile?.email || ""}</p>
                </div>

                <button className="edit-profile-btn" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="navbar-wrapper">
          <Navbar />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
