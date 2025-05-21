import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './../assets/styles/Dashboard/Dashboard.css';
import Sidebar from '../components/Sidebar';
import Languages from '../components/Dashboard/Languages';
import Progress from '../components/Dashboard/Progress';
import Chapters from '../components/Dashboard/Chapters';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar currentPath={location.pathname} />
      
      <div className="main-content-area">
        <div className="content-wrapper">
          <div className="rounded-white-container">
            {/* Fixed Navbar */}
            <div className="dashboard-navbar-container">
              <div className="dashboard-navbar">
                {['home', 'courses', 'profile', 'about us'].map((route) => (
                  <button
                    key={route}
                    className={`nav-link ${location.pathname.includes(route.replace(' ', '-')) ? 'active' : ''}`}
                    onClick={() => handleNavigation(`/${route.replace(' ', '-')}`)}
                  >
                    {route}
                  </button>
                ))}
              </div>
            </div>

            <div className="languages-section">
              <Languages />
            </div>
            
            <div className="dashboard-middle-section">
              <div className="chapters-section">
                <Chapters />
              </div>
              <div className="progress-section">
                <Progress />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;