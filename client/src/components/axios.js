import axios from "axios";

const API = axios.create({
  baseURL: "https://sellmypmtest.vercel.app",
});

export default API;
