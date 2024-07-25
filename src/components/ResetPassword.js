import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const query = useQuery();
  const token = query.get('token'); // Extracting the token from the query parameters

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
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
      await axiosInstance.post('/auth/reset-password', { newPassword: password, token });
      setMessage('Password reset successful');
    } catch (error) {
      console.error(error);
      setMessage('Failed to reset password');
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
