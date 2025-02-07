import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Navbar() {
  const [open, setOpen] = useState(false);
   let navigate=useNavigate();
  const { currentUser,updateUser } = useContext(AuthContext);

  if(currentUser) fetch();
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Real Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/list">All posts</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
               <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
        <a href="/profile">Profile</a>
          <a href="/">Home</a>
          <a href="/list">All posts</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>

         {
          currentUser? <div className="btnl" onClick={handleLogout}>Logout</div>:(<> <a  className="btn" href="/login">Sign in</a>
            <a  className="btn" href="/register">Sign up</a></>)
         }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
