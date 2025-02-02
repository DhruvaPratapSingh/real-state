import "./login.scss";
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from './../../context/AuthContext';
function Login() {
  const navigate=useNavigate();
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
    const{updateUser}=useContext(AuthContext);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);
   const formdata = new FormData(e.target);
   const username = formdata.get('username');
  //  const email = formdata.get('email');
   const password = formdata.get('password');
   try {
    const res=await apiRequest.post('/auth/login',{
     username, password
    })
    // console.log(res);
    // localStorage.setItem("user",JSON.stringify(res));
    updateUser(res.data);
    navigate("/");
  } catch (error) {
    console.log(error);
    setError(error.response.data.message)
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
