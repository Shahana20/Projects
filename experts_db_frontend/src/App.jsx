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
      </Routes>
    </Router>
  );
};

export default App;
