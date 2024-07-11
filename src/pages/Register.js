import React, { useState } from 'react';

import '../styles/App.css';
import "../styles/login.css";
import { Navigate } from 'react-router-dom';


const  Register = ()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const handleLogin = async(e) => {
    // Perform login logic here
    alert(`Register  as ${username}`);
    
      e.preventDefault();

      const response = await fetch("http://localhost:4000/register", {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { "content-Type": "application/json" },
      })
      if (response.status !== 200) {
        alert("registration failed");
      }
      else {
        alert("registration success");
        setRedirect(true);

      }
    
  };
  if(redirect){
    return <Navigate to={'/'} />
   }

  return (
    <div className="login-container" >
      <div className="login-box">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Register</button>
      </div>
    </div>
  );
}

export default Register;
