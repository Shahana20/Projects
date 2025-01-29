import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './Components/Authentication/Login';
import SignupForm from './Components/Authentication/Signup'; 
import Navbar from './Components/Navbar/Navbar';
import Hello from './Components/Hello';
import EditProfile from './Components/Profile/EditProfile'
import UserProfile from './Components/Profile/UserProfile'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; 
import PeoplePage from './Components/People/PeoplePage';
import { MdDashboard } from 'react-icons/md';
import UserDashboard from './Components/Dashboard/UserDashboard';
import ResultProfile from './Components/Profile/ResultProfile';
import ReviewForm from './Components/Review.jsx/ReviewForm';
import SearchResults from './Components/People/SearchResults';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import ResetPassword from './Components/Authentication/ResetPassword';

const App = () => {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/hello" element={<Hello/>}/>
        <Route path="/edit" element={<EditProfile/>} />
        <Route path="/view" element={<UserProfile/>}/>
        <Route path="/people" element={<PeoplePage/>}/>
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path ="/results" element={<ResultProfile/>}/>
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/search-results"element={<SearchResults />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes> 
    </Router>
  );
};

export default App;
