import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const api = 'http://localhost:5000/api';

  const handleSubmit = () => {
    const endpoint = mode === 'register' ? 'register' : 'login';
    axios.post(`${api}/${endpoint}`, { accountNumber, password })
      .then((res) => {
        setMessage(res.data || 'Success');
      })
      .catch((err) => {
        setMessage('Error occurred');
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{mode === 'login' ? 'Login Account' : 'Register Account'}</h2>

      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button onClick={handleSubmit} style={{ width: '100%', marginBottom: '10px' }}>
        {mode === 'login' ? 'Login' : 'Register'}
      </button>

      <p>
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {mode === 'login' ? 'Register here' : 'Login here'}
        </span>
      </p>

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default App;
