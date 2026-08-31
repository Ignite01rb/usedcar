import axios from "axios"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance