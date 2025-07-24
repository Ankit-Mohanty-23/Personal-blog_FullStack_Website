import React, { useState } from "react";
import '../pages/LoginPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username,
        password,
      });
      
      localStorage.setItem('token', response.data.token)
      navigate('/admin/dashboard');

      console.log('login Successfull: ', response.data);
      alert('Login successful! Check the console for your token.');
    }catch(err){
      console.error('Login failed: ', err);
      if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message)
      }else{
        setError('Login failed. Please try again.');
      }
    }finally{
      setLoading(false);
    }

  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-groupone">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter the username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-grouptwo">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter the password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled = {loading}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center', paddingBottom: '1rem'}}>{error}</p>}
        <button type="submit" className="login-button" disabled = {loading}>
          {loading ? 'Loading... ' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
