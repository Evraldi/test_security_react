import React, { useState } from 'react';
import axios from '../axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateInputs = () => {
    let isValid = true;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post('/auth/login', { email, password });
      alert('Login successful');
    } catch (error) {
      console.error(error);

      const errorMsg = error.response?.data?.message || 'Login failed: Please try again.';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">Email:</label>
      <input 
        id="email"
        name="email"
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        aria-describedby="email-error"
      />
      {emailError && <p id="email-error" style={{ color: 'red' }}>{emailError}</p>}
      
      <label htmlFor="password">Password:</label>
      <input 
        id="password"
        name="password"
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        aria-describedby="password-error"
      />
      {passwordError && <p id="password-error" style={{ color: 'red' }}>{passwordError}</p>}
      
      <button type="submit">Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default Login;
