// import React from 'react';
// import '../assets/styles/sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="app-container">
//       {/* Sidebar Navigation - unchanged */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <div className="user-profile">
//             <div className="avatar">MD</div>
//             <div className="user-info">
//               <h3>Meriem Djidjeli</h3>
//               <p>User Profile</p>
//             </div>
//             <span className="dropdown-arrow">▼</span>
//           </div>
//         </div>
        
//         <nav className="sidebar-menu">
//           <ul>
//             <li className="active">
//               <span className="icon">📊</span>
//               <span className="menu-text">Profile</span>
//             </li>
//             <li>
//               <span className="icon">📈</span>
//               <span className="menu-text">Dashboard</span>
//             </li>
//             <li>
//               <span className="icon">⚙️</span>
//               <span className="menu-text">Settings</span>
//             </li>
//           </ul>
          
//           <div className="menu-footer">
//             <li className="logout-item">
//               <span className="icon">🚪</span>
//               <span className="menu-text">Log out</span>
//             </li>
//           </div>
//         </nav>
//       </div>

//       {/* Empty white container ready for your content */}
//       <div className="main-content">
//         <div className="content-container">
//           <div className="rounded-white-container">
//             {/* Empty container - add your content here */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/sidebar.css';
import profileImg from '../assets/images/profile.jpg';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Check if a menu item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
          <img src={profileImg} alt="Profile" className="avatar" />
          <div className="user-info">
              <h3>Meriem Djidjeli</h3>
              <p>User Profile</p>
            </div>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        
        <nav className="sidebar-menu">
          <ul>
            <li 
              className={isActive('/profile') ? 'active' : ''}
              onClick={() => handleNavigation('/profile')}
            >
              <span className="icon">📊</span>
              <span className="menu-text">Profile</span>
            </li>
            <li 
              className={isActive('/dashboard') ? 'active' : ''}
              onClick={() => handleNavigation('/dashboard')}
            >
              <span className="icon">📈</span>
              <span className="menu-text">Dashboard</span>
            </li>
            <li 
              className={isActive('/settings') ? 'active' : ''}
              onClick={() => handleNavigation('/settings')}
            >
              <span className="icon">⚙️</span>
              <span className="menu-text">Settings</span>
            </li>
          </ul>
          
          <div className="menu-footer">
            <li 
              className="logout-item"
              onClick={() => handleNavigation('/logout')}
            >
              <span className="icon">🚪</span>
              <span className="menu-text">Log out</span>
            </li>
          </div>
        </nav>
      </div>
    
  );
};

export default Sidebar;