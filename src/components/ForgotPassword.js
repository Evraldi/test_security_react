import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import axios from '../axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await axios.post('/auth/forgot-password', { email });
      setMessage(DOMPurify.sanitize('Password reset link sent to your email.'));
    } catch (error) {
      console.error('Error:', error);
      setError(DOMPurify.sanitize('Failed to send reset link. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
      {message && <p className="message" dangerouslySetInnerHTML={{ __html: message }} />}
      {error && <p className="error" dangerouslySetInnerHTML={{ __html: error }} />}
    </form>
  );
};

export default ForgotPassword;
