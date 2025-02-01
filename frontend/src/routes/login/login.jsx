import "./login.scss";
import { Link } from "react-router-dom";
import { useState, useNavigate } from "react";
import axios from "axios";
function Login() {
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
    const res=await axios.post('http://localhost:8000/api/auth/login',{
     username, email, password
    })
    navigate("/register");
    // console.log(res.data);
  } catch (error) {
    setError(error.response.data.error)
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" required placeholder="Username" />
          <input name="password" type="password" required placeholder="Password" />
          <button disabled={loading}>Login</button>
          {error && <span>{error}</span>} 
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
