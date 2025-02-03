import { useState,useContext } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from './../../context/AuthContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const{currentUser}=useContext(AuthContext);
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
             src={currentUser.avatar||"https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"}
             alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile"  onClick={() => console.log("Profile clicked")}>
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login" className="login">Sign in</a>
            <a href="/register" className="register">Sign up</a>
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
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
