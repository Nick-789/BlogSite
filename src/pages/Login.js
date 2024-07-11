import React, { useContext, useState } from 'react';

import '../styles/App.css';
import "../styles/login.css";
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/usercontext';



const  Login = ()=> {

const {setUserInfo} = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
 
  const handleLogin = async(e) => {
  
    alert(`Login  as ${username}`);
    
      e.preventDefault();

      const response = await fetch("http://localhost:4000/login", {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials:"include",
      })
      if (response.ok) {
        response.json().then(userInfo=>{
          setUserInfo(userInfo);
          setRedirect(true);
        });
      
      }

      else {
        alert("wrong Credentials");

      }
    
  };

 if(redirect){
  return <Navigate to={'/'} />
 }
  return (
    <div className="login-container" >
      <div className="login-box">
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
