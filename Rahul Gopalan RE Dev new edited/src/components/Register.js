// Register.js
import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send registration request to backend
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, phone, address }),
      });
      // Handle response
      const data = await response.json();
      // Handle successful registration (redirect, show success message, etc.)
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Phone:</label>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <label>Address:</label>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
