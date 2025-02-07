import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-state-xpxt.onrender.com/api", 
  withCredentials: true,
});

export default apiRequest;
