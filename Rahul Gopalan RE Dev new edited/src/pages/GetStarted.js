import React from 'react';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Register from '../components/Register';
import { Link } from 'react-router-dom';

function GetStarted() {
  return (
    <div>
      <h1>Welcome to Get Started Page</h1>
      <div>
        <h2>Register</h2>
        <Register />
      </div>
      <div>
        <h2>Login</h2>
        <Login />
      </div>
      <div>
        <h2>Logout</h2>
        <Logout />
      </div>
      <div>
        <Link to="/login">Go to Login</Link>
        <br />
        <Link to="/register">Go to Register</Link>
      </div>
    </div>
  );
}

export default GetStarted;
