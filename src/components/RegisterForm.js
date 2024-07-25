import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axiosInstance.get('/auth/csrf-token')
      .then(response => {
        const csrfToken = response.data.csrfToken;
        document.cookie = `XSRF-TOKEN=${csrfToken}; path=/`;
        console.log(csrfToken);
      })
      .catch(error => console.error('Error fetching CSRF token:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post('/auth/register', { email, username, password })
      .then(response => {
        console.log('Registration successful:', response.data);
      })
      .catch(error => {
        console.error('Error registering:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
