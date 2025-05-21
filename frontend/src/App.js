import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursesPage from "./screens/courses/courses_languages"; 
import ChaptersPage from "./screens/courses/chapters"; 
import ChapterDetailsPage from "./screens/courses/ChapterDetailsPage"; 
import LecturePage from "./screens/courses/LecturePage"; 
import ExercisesPage from "./screens/courses/ExercisesPage";
import ExercisePage from "./screens/courses/exerciseContent"; 
import AboutUs from "./screens/aboutUs.js";
import Home from './screens/home'; 
import Dashboard from './screens/dashboard'; 
import QuizPage from './screens/quiz'; 

import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/login";  // Ensure correct path
import ResetPassword from "./screens/ResetPassword"; // Import ResetPassword page
import SuccessPasswordReset from "./screens/SuccessPasswordReset"; // Ensure import
import Signup from "./screens/signup";
import ProfilePage from "./screens/profile";
import EditProfilePage from "./screens/editprofile";
import Settings from "./screens/settings";

import ForgotPasswordProfile from "./screens/forgotpasswordprofile"; 
import ResetPasswordProfile from "./screens/resetpasswordprofile"; 

import SuccessfulResetPasswrodProfile from "./screens/successfulresetpasswordprofile"; 
import ChangeEmailProfile from "./screens/changeemailprofile"; 
import SuccessfulEmailChangeProfile from "./screens/successfulemailchangeprofile"; 

import ChangePasswordProfile from "./screens/changepasswordprofile"; 

import SuccessfulPasswordChangeProfile from "./screens/successfulpasswordchangeprofile"; 
import DeleteAccount from "./screens/deleteaccount"; 
import SuccessfulDeleteAccount from "./screens/successfuldeleteaccount"; 

import Navbar from "./components/navBar";
import NavbarProfile from "./components/navBarprofile";
import Sidebar from "./components/Sidebar";

import ConfirmEmailChange from "./screens/ConfirmEmailChange";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<ChaptersPage />} />
        <Route path="/courses/:courseId/:chapterId" element={<ChapterDetailsPage />} />
        <Route path="/courses/:courseId/:chapterId/content" element={<LecturePage />} />
        <Route path="/courses/:courseId/:chapterId/exercises" element={<ExercisesPage />} />
        <Route path="/courses/:courseId/:chapterId/exercises/:exerciseId" element={<ExercisePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<QuizPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success-password-reset" element={<SuccessPasswordReset />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/forgot-password-profile" element={<ForgotPasswordProfile />} />
        <Route path="/reset-password-profile" element={<ResetPasswordProfile />} />
        <Route path="/successful-reset-password-profile" element={<SuccessfulResetPasswrodProfile />} />
        <Route path="/change-email-profile" element={<ChangeEmailProfile />} />
        <Route path="/successful-email-change-profile" element={<SuccessfulEmailChangeProfile />} />
        <Route path="/change-password-profile" element={<ChangePasswordProfile />} />
        <Route path="/successful-password-change-profile" element={<SuccessfulPasswordChangeProfile />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/successful-delete-account" element={<SuccessfulDeleteAccount />} />

        <Route path="/confirm-email-change" element={<ConfirmEmailChange />} />
      </Routes>
    </Router>
  );
}

export default App;



