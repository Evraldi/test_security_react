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

    if (!email.includes('@')) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
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
      await axios.post('/auth/login', { email, password });
      alert('Login successful');
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed: ' + (error.response?.data?.msg || 'Please try again.'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        Email:
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          aria-describedby="email-error"
        />
        {emailError && <p id="email-error" style={{ color: 'red' }}>{emailError}</p>}
      </label>
      <label>
        Password:
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          aria-describedby="password-error"
        />
        {passwordError && <p id="password-error" style={{ color: 'red' }}>{passwordError}</p>}
      </label>
      <button type="submit">Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default Login;
