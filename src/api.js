import axios from 'axios';

const API_URL = 'https://mern-auth-otp-server.vercel.app/api/auth'; // Update backend API URL

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const verifyOtp = async (otpData) => {
  return axios.post(`${API_URL}/verify-otp`, otpData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
