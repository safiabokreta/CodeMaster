import React, { useState, useEffect } from "react";
import "../assets/styles/profile/editprofile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [programmingLevel, setProgrammingLevel] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    fetch(`http://127.0.0.1:8000/api/auth/public-profile/?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        setName(data.username || "");
        setBio(data.bio || "");
        setProgrammingLevel(data.programming_level || "Beginner");
        setEnglishLevel(data.english_level || "Beginner");
      });
  }, []);

  const handleSave = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    await fetch(`http://127.0.0.1:8000/api/auth/public-profile/?email=${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        bio,
        programming_level: programmingLevel,
        english_level: englishLevel,
      }),
    });
    navigate('/profile');
  };

  return (
    <div className="profileee-container">
      <Sidebar />
      <div className="main-content">
        <div className="profileee-content">
          <div>
            <h1 className="section-title">Personal Details</h1>
            <div className="profilee-main">
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
              <div className="profilee-right">
                <h2 className="labelyl">Edit Profile</h2>
                <div className="formmmi-group">
                  <label className="labellly">User Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="formmi-group">
                  <label className="labellly">My Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="input-field"
                    rows={3}
                  />
                </div>
                <div className="formmi-group">
                  <label className="labellly">Programming Level</label>
                  <select
                    className="input-field"
                    value={programmingLevel}
                    onChange={e => setProgrammingLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="formmi-group">
                  <label className="labellly">English Level</label>
                  <select
                    className="input-field"
                    value={englishLevel}
                    onChange={e => setEnglishLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <button className="edit-profile-bttn" onClick={handleSave}>
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

export default EditProfile;
