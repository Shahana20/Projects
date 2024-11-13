import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBAlert } from 'mdb-react-ui-kit'; // MDB UI Kit

const Signup = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling the button during submission

  const navigate = useNavigate(); // To navigate after successful signup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    // Reset error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('Weak');
    } else if (password.length >= 6 && password.length < 12) {
      setPasswordStrength('Moderate');
    } else {
      setPasswordStrength('Strong');
    }
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    checkPasswordStrength(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page on submit

    // Basic validation for empty fields
    if (!userData.first_name || !userData.last_name || !userData.email || !userData.password || !userData.password_confirmation) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Password confirmation check
    if (userData.password !== userData.password_confirmation) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsSubmitting(true); // Disable the button during submission

    try {
      const response = await axios.post('http://localhost:3000/api/v1/signup', { auth: userData });
      console.log(response.data);
      setErrorMessage(''); // Reset error message on successful signup
      navigate('/dashboard'); // Redirect to dashboard after successful signup
    } catch (error) {
      // Handle error and display message
      setErrorMessage(error.response ? error.response.data.errors.join(', ') : 'An error occurred');
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <MDBContainer fluid className="h-100">
      <MDBRow className='d-flex justify-content-center align-items-center h-100 bg-primary'>
        <MDBCol col='12'>

          <MDBCard className='bg-white text-black my-5 mx-auto' style={{ borderRadius: '3rem', borderColor: "black", maxWidth: '400px' }}>
            <MDBCardBody className='p-4 d-flex flex-column align-items-center mx-auto w-100'>

              <img
                className="rounded-circle"
                src="https://via.placeholder.com/50"
                alt="Profile"
              />
              <h3 className="ms-2 fw-bold text-uppercase">Experts</h3>

              <h4 className="fw-bold mb-4 text-uppercase">Sign Up</h4>
              <p className="text-black-50 mb-4">Please enter your details to create an account!</p>

              {/* Error Message
              {errorMessage && <MDBAlert color="danger">{errorMessage}</MDBAlert>} */}

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-black'
                  label='First Name'
                  placeholder='Enter your first name'
                  id='first_name'
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  size="lg"
                />

                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-black'
                  label='Last Name'
                  placeholder='Enter your last name'
                  id='last_name'
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  size="lg"
                />

                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-black'
                  label='Email address'
                  placeholder='Enter your email address'
                  id='email'
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  size="lg"
                />

                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-black'
                  label='Password'
                  placeholder='Enter your Password'
                  id='password'
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handlePasswordChange}
                  size="lg"
                />
                {/* <span>Password Strength: {passwordStrength}</span> */}

                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-black'
                  label='Confirm Password'
                  placeholder='Enter your password(again)'
                  id='password_confirmation'
                  type="password"
                  name="password_confirmation"
                  value={userData.password_confirmation}
                  onChange={handleChange}
                  size="lg"
                />

                <MDBBtn type="submit" color="primary" block disabled={isSubmitting}>
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </MDBBtn>
              </form>

              <div>
                <p className="mb-0 p-3">Already have an account? <a href="/login" className="text-black-50 fw-bold">Login</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;
