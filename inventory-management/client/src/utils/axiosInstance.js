import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: 'http://192.168.0.109:3000/',

  timeout: 20000,
  withCredentials: true,
  headers: {
        "Content-Type": "application/json",
    }
});
export default instance;