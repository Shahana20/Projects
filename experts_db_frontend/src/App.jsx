import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './Components/Authentication/Login';
import SignupForm from './Components/Authentication/Signup'; 
import Navbar from './Components/Navbar/Navbar';
import Hello from './Components/Hello';
import EditProfile from './Components/Profile/EditProfile'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; 

const App = () => {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/hello" element={<Hello/>}/>
        <Route path="/edit" element={<EditProfile/>} />
      </Routes>
    </Router>
  );
};

export default App;
