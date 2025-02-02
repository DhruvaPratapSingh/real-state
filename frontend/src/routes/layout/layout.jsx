import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../context/AuthContext';

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}

function RequireLayout() {
  const {currentUser}=useContext(AuthContext);
  const navigate=useNavigate();
  useEffect(()=>{
    if(!currentUser){
      navigate("/login")
    }
  },[currentUser,navigate]);
  return (
   currentUser && (<div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>)
  );
}

export{
  Layout,
  RequireLayout
};
