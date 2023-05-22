import axios from "axios";

export default axios.create({
  // baseURL: "http://10.0.0.151:8000/api",
  baseURL: "https://host02.birosolusi.com/edesa/public/api",
  headers: {
    "Content-type": "application/json",
  },
});
