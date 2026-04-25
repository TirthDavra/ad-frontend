import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      const setToken = JSON.parse(token || "")
      if (setToken) {
        config.headers.Authorization = `Bearer ${setToken}` // Attach auth token
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
