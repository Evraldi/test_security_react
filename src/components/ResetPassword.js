import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axios';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const query = useQuery();
  const token = query.get('token');

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must include at least one uppercase letter');
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError('Password must include at least one number');
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError('Password must include at least one special character');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/auth/reset-password', { newPassword: password, token });
      setMessage('Password reset successful');
    } catch (error) {
      console.error(error);
      setMessage('Failed to reset password: ' + (error.response?.data?.msg || 'Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <label>
        New Password:
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          aria-describedby="password-error"
        />
        {passwordError && <p id="password-error" style={{ color: 'red' }}>{passwordError}</p>}
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Reset Password'}
      </button>
      {message && <p style={{ color: isLoading ? 'blue' : 'red' }}>{message}</p>}
    </form>
  );
};

export default ResetPassword;
