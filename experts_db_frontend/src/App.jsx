import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Authentication/Login';
import SignupForm from './Components/Authentication/Signup'; 
import Dashboard from './Components/Profile/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import Hello from './Components/Hello';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hello" element={<Hello/>}/>
      </Routes>
    </Router>
  );
};

export default App;
