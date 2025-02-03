import "./profileUpdatePage.scss";
import { AuthContext } from './../../context/AuthContext';
import { useContext, useState } from 'react';
import apiRequest from './../../lib/apiRequest.js';
import { useNavigate } from "react-router-dom";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [value, setValue] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: ""
  });
  const navigate=useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, value);
      console.log(res.data);
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={value.username}
              onChange={(e) => setValue({ ...value, username: e.target.value })}
              autoComplete="off"
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              autoComplete="off"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              autoComplete="off"
            />
          </div>
          <button type="submit">Update</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatar || "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"}
          alt="Profile Avatar"
          className="avatar"
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
