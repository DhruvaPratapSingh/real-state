import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import apiRequest from "../../lib/apiRequest";
function Register() {
  const navigate=useNavigate();
  const [error,setError]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
   const formdata = new FormData(e.target);
   const username = formdata.get('username');
   const email = formdata.get('email');
   const password = formdata.get('password');
   try {
    const res=await apiRequest.post('/auth/register',{
     username, email, password
    })
    navigate("/login");
    // console.log(res.data);
   } catch (error) {
     console.log(error);
     console.log(error.response.data.error);
      setError(error.response.data.error)
   }
  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" required placeholder="Username" />
          <input name="email" type="text" required placeholder="Email" />
          <input name="password" type="password" required placeholder="Password" />
          <button >Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
