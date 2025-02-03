import "./profileUpdatePage.scss";
import { AuthContext } from './../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import apiRequest from './../../lib/apiRequest.js';
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [value, setValue] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
    avatar: currentUser.avatar || "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    setValue((prev) => ({ ...prev, avatar }));
    // console.log(typeof avatar);
    // console.log(avatar);
    // console.log(avatar?.[0]);
    // console.log(typeof avatar?.[0]);
  }, [avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, value, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "An error occurred while updating your profile.");
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
          src={avatar?.[0] || currentUser.avatar || "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"}
          alt="Profile Avatar"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dtqy9mnph",
            uploadPreset: "estate",
            folder: "avatars",
            multiple: false,
            maxImageFileSize: 2000000
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
