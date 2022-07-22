import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../App.css";
import PropTypes from "prop-types";
import axios from "axios";
import Nav from "../components/Navbar/Nav";


export default function Login({setToken}) {

  const [message,setMessage] = useState();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const login = async() => {
    try {
      const { data } = await axios.post("/users/login",{email,password},config);
      setToken(data.token);
      navigate("../movies");
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }
  return (
    <>
      <Nav />
      <main>
        <div className="main">
          <h2 className="center">Login</h2>
          {(message && message.length > 0) && (
          <div className="message">{message}</div>
        )}
          <div className="input">
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' className="padder" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="input">
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' className="padder" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button className="center whitener" onClick={login} type="button">Submit</button>
        </div>
      </main>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
