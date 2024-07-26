import React, { useState } from 'react';
import axios from '../axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    } else if (username.length < 5) {
      setUsernameError('Username must be at least 5 characters long');
      isValid = false;
    } else {
      setUsernameError('');
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character');
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

    setIsLoading(true);
    try {
      await axios.post('/auth/register', { email, password, username });
      alert('Registration successful');
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Registration failed: ' + (error.response?.data?.msg || 'Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>
        Email:
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          aria-required="true"
          aria-invalid={!!emailError}
          aria-describedby="email-error"
        />
        {emailError && <p id="email-error" style={{ color: 'red' }}>{emailError}</p>}
      </label>
      <label>
        Username:
        <input 
          type='text' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          aria-required="true"
          aria-invalid={!!usernameError}
          aria-describedby="username-error"
        />
        {usernameError && <p id="username-error" style={{ color: 'red' }}>{usernameError}</p>}
      </label>
      <label>
        Password:
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          aria-required="true"
          aria-invalid={!!passwordError}
          aria-describedby="password-error"
        />
        {passwordError && <p id="password-error" style={{ color: 'red' }}>{passwordError}</p>}
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default Register;
