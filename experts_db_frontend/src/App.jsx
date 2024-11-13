import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Authentication/Login';
import SignupForm from './Components/Authentication/Signup'; 
import Dashboard from './Components/Profile/Dashboard';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<h1>Welcome to our App</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
