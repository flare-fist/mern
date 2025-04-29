import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [fetchedBalance, setFetchedBalance] = useState(null);

  const [message, setMessage] = useState('');

  const api = 'http://localhost:5000/api';

  const handleCreateAccount = () => {
    axios.post(`${api}/accounts`, { accountNumber, balance: Number(balance) })
      .then(() => setMessage('Account created'))
      .catch(() => setMessage('Failed to create account'));
  };

  const handleCheckBalance = () => {
    axios.get(`${api}/balance/${accountNumber}`)
      .then((res) => {
        setFetchedBalance(res.data);
        setMessage('');
      })
      .catch(() => {
        setFetchedBalance(null);
        setMessage('Account not found');
      });
  };

  const handleUpdateAccount = () => {
    axios.put(`${api}/accounts/${accountNumber}`, { balance: Number(balance) })
      .then(() => setMessage('Account updated'))
      .catch(() => setMessage('Failed to update account'));
  };

  const handleDeleteAccount = () => {
    axios.delete(`${api}/accounts/${accountNumber}`)
      .then(() => setMessage('Account deleted'))
      .catch(() => setMessage('Failed to delete account'));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Bank Account Manager</h2>

      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button onClick={handleCreateAccount}>Create Account</button>
      <button onClick={handleCheckBalance} style={{ marginLeft: '10px' }}>🔍 View Balance</button>
      <button onClick={handleUpdateAccount} style={{ marginLeft: '10px' }}>✏ Update Balance</button>
      <button onClick={handleDeleteAccount} style={{ marginLeft: '10px', background: 'crimson', color: 'white' }}>🗑 Delete</button>

      <div style={{ marginTop: '20px' }}>
        {fetchedBalance !== null && <h3>Balance: ₹{fetchedBalance}</h3>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
