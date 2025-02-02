import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import apiRequest from "../../lib/apiRequest";
function Register() {
  const navigate=useNavigate();
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.target);
    const username = formdata.get('username');
    const email = formdata.get('email');
    const password = formdata.get('password');
    try {
      const res=await apiRequest.post('/auth/register',{
        username, email, password
      })
    navigate("/login");
    // console.log(res);
   } catch (error) {
    //  console.log(error);
    //  console.log(error.response.data.error);
      setError(error.response.data.error)
   } finally{
    setLoading(false);
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
          <button disabled={loading}>Register</button>
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
