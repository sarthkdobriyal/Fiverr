import React, { useState }from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';

import newRequest from '../../utils/newRequest.js'




const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try{
      const res = await newRequest.post("auth/login", {email,password})
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    }catch(err){
      setError(err.response.data);
      
    }


  }

  return (
    <div className="login">
      <form 
      
      >
        <h1>Sign in</h1>
        <label htmlFor="">Email</label>
        <input
          name="username"
          type="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Login</button>
        {error && error}
      </form>
    </div>
  )
}

export default Login