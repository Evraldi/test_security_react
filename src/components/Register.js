import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import axios from '../axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const validateInputs = () => {
    let isValid = true;

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedName = sanitizeInput(name);

    if (sanitizedName.trim() === '') {
      setNameError('Username is required');
      isValid = false;
    } else if (sanitizedName.length < 5) {
      setNameError('Username must be at least 5 characters long');
      isValid = false;
    } else {
      setNameError('');
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(sanitizedEmail)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(sanitizedPassword)) {
      setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character');
      isValid = false;
    } else {
      setPasswordError('');
    }
    console.log(emailError);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/auth/register', { email: sanitizeInput(email), password: sanitizeInput(password), name: sanitizeInput(name) });
      alert('Registration successful');
      setEmail('');
      setPassword('');
      setName('');
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
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          aria-required="true"
          aria-invalid={!!nameError}
          aria-describedby="name-error"
        />
        {nameError && <p id="name-error" style={{ color: 'red' }}>{nameError}</p>}
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
