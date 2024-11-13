import React, { useState } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', formData);
      console.log(response.data);  

      localStorage.setItem('token', response.data.token);  

      window.location.href = '/dashboard';  
    } catch (error) {
      console.error(error.response.data);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <MDBContainer fluid className="h-100" style={{ backgroundColor: '#1d608d' }}>
      <MDBRow className="d-flex justify-content-center align-items-center h-100 bg-primary">
        <MDBCol col="12" lg="6">

          <MDBCard className="bg-white text-black my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className="p-4 d-flex flex-column align-items-center mx-auto w-100">

              <h3 className="fw-bold text-uppercase">Login</h3>
              <p className="text-black-50 mb-4">Please enter your login credentials!</p>

              <form onSubmit={handleLogin} className="w-100">
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  labelClass="text-black"
                  placeholder="Email"
                  id="formControlLg"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  labelClass="text-black"
                  placeholder="Password"
                  id="formControlLg"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  size="lg"
                />

                <MDBBtn type="submit" className="btn-primary w-100 mb-3" size="lg">
                  Login
                </MDBBtn>
              </form>

              <div className="text-end w-100 mb-3">
                <a href="/forgot-password" className="text-black-50">Forgot Password?</a>
              </div>

              <div>
                <p className="mb-0 p-3">
                  Don't have an account? <a href="/signup" className="text-black-50 fw-bold">Sign Up</a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginForm;
